/* ==================== SISTEMA DE CENA 3D COM THREE.JS ==================== */

class Scene3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.player = null;
        this.enemies = [];
        this.environment = null;
        this.particles = [];
        this.lights = [];
        this.currentMap = 'village';
        
        this.initScene();
        this.createEnvironment();
        this.setupControls();
        this.startAnimationLoop();
    }

    initScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e1f);
        this.scene.fog = new THREE.Fog(0x0a0e1f, 500, 1000);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 30, 50);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        document.getElementById('canvas3d').appendChild(this.renderer.domElement);

        // Responsive
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createEnvironment() {
        // Piso com padrão de grade
        const groundGeometry = new THREE.PlaneGeometry(500, 500);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a3a2e,
            metalness: 0.3,
            roughness: 0.8,
            emissive: 0x0a1a15
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Adicionar padrão de grade visual
        const gridHelper = new THREE.GridHelper(500, 50, 0x00ff41, 0x004d00);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // Iluminação
        this.setupLighting();

        // Montanhas ao fundo
        this.createMountains();

        // Árvores e vegetação
        this.createTrees();

        // Estruturas
        this.createVillageStructures();

        // Portais/Dungeons
        this.createDungeonPortals();
    }

    setupLighting() {
        // Luz ambiente
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        // Luz direcional (sol)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(100, 150, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -200;
        directionalLight.shadow.camera.right = 200;
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = -200;
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);

        // Luz pontual para efeito mágico
        const magicLight = new THREE.PointLight(0x00ff41, 1, 300);
        magicLight.position.set(0, 50, 0);
        magicLight.castShadow = true;
        this.scene.add(magicLight);
        this.lights.push(magicLight);

        // Céu com stars
        this.createStarfield();
    }

    createStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1000;
        const posArray = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 2000;
            posArray[i + 1] = Math.random() * 1500 + 500;
            posArray[i + 2] = (Math.random() - 0.5) * 2000;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            color: 0xffffff,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
    }

    createMountains() {
        const mountainGeometry = new THREE.ConeGeometry(150, 300, 32);
        const mountainMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            metalness: 0.1,
            roughness: 0.9
        });

        const positions = [
            { x: -300, z: -300 },
            { x: 300, z: -300 },
            { x: -200, z: 350 }
        ];

        positions.forEach(pos => {
            const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
            mountain.position.set(pos.x, 0, pos.z);
            mountain.castShadow = true;
            mountain.receiveShadow = true;
            this.scene.add(mountain);
        });
    }

    createTrees() {
        const treePositions = [
            { x: -100, z: -100 },
            { x: 100, z: -80 },
            { x: -80, z: 100 },
            { x: 120, z: 100 },
            { x: -150, z: 200 },
            { x: 150, z: 150 }
        ];

        treePositions.forEach(pos => {
            this.createTree(pos.x, pos.z);
        });
    }

    createTree(x, z) {
        // Tronco
        const trunkGeometry = new THREE.CylinderGeometry(8, 12, 40, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({
            color: 0x654321,
            metalness: 0,
            roughness: 1
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, 20, z);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        this.scene.add(trunk);

        // Folhagem
        const foliageGeometry = new THREE.SphereGeometry(30, 8, 8);
        const foliageMaterial = new THREE.MeshStandardMaterial({
            color: 0x228b22,
            metalness: 0.1,
            roughness: 0.8,
            emissive: 0x0a3a0a
        });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(x, 50, z);
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        this.scene.add(foliage);
    }

    createVillageStructures() {
        // Casa 1 - Taverna
        this.createHouse(-100, 50, 0xff6b35);

        // Casa 2 - Loja
        this.createHouse(100, 50, 0x004e89);

        // Casa 3 - Temple
        this.createHouse(0, 100, 0xffd700);

        // Fountain no centro
        this.createFountain(0, 0);
    }

    createHouse(x, z, color) {
        // Paredes
        const wallGeometry = new THREE.BoxGeometry(40, 40, 40);
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.1,
            roughness: 0.8
        });
        const walls = new THREE.Mesh(wallGeometry, wallMaterial);
        walls.position.set(x, 20, z);
        walls.castShadow = true;
        walls.receiveShadow = true;
        this.scene.add(walls);

        // Telhado
        const roofGeometry = new THREE.ConeGeometry(30, 25, 4);
        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b0000,
            metalness: 0.2,
            roughness: 0.7
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.set(x, 50, z);
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        this.scene.add(roof);

        // Porta
        const doorGeometry = new THREE.BoxGeometry(10, 20, 1);
        const doorMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d2817,
            metalness: 0.3,
            roughness: 0.8
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(x, 10, z + 20.5);
        door.castShadow = true;
        this.scene.add(door);
    }

    createFountain(x, z) {
        // Base
        const baseGeometry = new THREE.CylinderGeometry(25, 30, 3, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 0.4,
            roughness: 0.6
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(x, 1.5, z);
        base.castShadow = true;
        this.scene.add(base);

        // Coluna central
        const columnGeometry = new THREE.CylinderGeometry(5, 5, 20, 16);
        const column = new THREE.Mesh(columnGeometry, baseMaterial);
        column.position.set(x, 10, z);
        column.castShadow = true;
        this.scene.add(column);

        // Topo com brilho
        const topGeometry = new THREE.SphereGeometry(8, 16, 16);
        const topMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x00aaff
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.set(x, 25, z);
        this.scene.add(top);
    }

    createDungeonPortals() {
        const dungeonPositions = [
            { x: -200, z: -200, name: 'Dragon\'s Lair', color: 0xff0000 },
            { x: 200, z: 200, name: 'Mage Tower', color: 0x0066ff },
            { x: -300, z: 100, name: 'Dark Forest', color: 0x330033 }
        ];

        dungeonPositions.forEach(pos => {
            this.createPortal(pos.x, pos.z, pos.name, pos.color);
        });
    }

    createPortal(x, z, name, color) {
        // Anel do portal
        const ringGeometry = new THREE.TorusGeometry(20, 2, 16, 100);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.9,
            roughness: 0.1,
            emissive: color
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(x, 30, z);
        ring.rotation.x = Math.PI / 2;
        this.scene.add(ring);

        // Esfera de energia no centro
        const coreGeometry = new THREE.SphereGeometry(10, 32, 32);
        const coreMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: color,
            metalness: 1,
            roughness: 0
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.position.set(x, 30, z);
        this.scene.add(core);

        // Adicionar luz ao portal
        const portalLight = new THREE.PointLight(color, 2, 200);
        portalLight.position.set(x, 30, z);
        this.scene.add(portalLight);

        // Armazenar portal
        if (!this.dungeons) this.dungeons = [];
        this.dungeons.push({
            position: { x, z },
            name: name,
            mesh: ring,
            core: core,
            light: portalLight
        });
    }

    createPlayer() {
        // Criar personagem do jogador
        this.player = new Player(0, 5, 0, this.scene);
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 2;
        this.controls.minDistance = 30;
        this.controls.maxDistance = 200;
        this.controls.maxPolarAngle = Math.PI * 0.9;
    }

    startAnimationLoop() {
        const animate = () => {
            requestAnimationFrame(animate);

            // Atualizar controles
            this.controls.update();

            // Animar portais
            if (this.dungeons) {
                this.dungeons.forEach(dungeon => {
                    dungeon.mesh.rotation.x += 0.005;
                    dungeon.mesh.rotation.y += 0.005;
                    dungeon.core.rotation.x += 0.01;
                    dungeon.core.rotation.y += 0.01;
                });
            }

            // Animar inimigos
            this.enemies.forEach(enemy => {
                if (enemy.mesh) {
                    enemy.mesh.rotation.y += 0.02;
                }
            });

            // Animar partículas
            this.particles = this.particles.filter(p => {
                p.update();
                return !p.isAlive;
            });

            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }

    spawnEnemy(x, z, type) {
        const enemy = new Enemy(x, z, type, this.scene);
        this.enemies.push(enemy);
        return enemy;
    }

    createParticles(x, y, z, color) {
        for (let i = 0; i < 20; i++) {
            const particle = new Particle(x, y, z, color, this.scene);
            this.particles.push(particle);
        }
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // Método para trocar mapa
    changeMap(mapName) {
        this.currentMap = mapName;
        this.scene.clear();
        this.enemies = [];
        this.createEnvironment();
        this.createPlayer();
    }
}

// Classe Player
class Player {
    constructor(x, y, z, scene) {
        this.scene = scene;
        this.position = { x, y, z };
        this.createMesh();
        this.animations = [];
    }

    createMesh() {
        // Corpo
        const bodyGeometry = new THREE.CapsuleGeometry(5, 15, 4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x0066ff,
            metalness: 0.4,
            roughness: 0.6
        });
        this.mesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);

        // Capacete/Cabeça
        const headGeometry = new THREE.SphereGeometry(6, 8, 8);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0xffa500,
            metalness: 0.3,
            roughness: 0.7
        });
        this.head = new THREE.Mesh(headGeometry, headMaterial);
        this.head.position.y = 15;
        this.mesh.add(this.head);

        // Arma
        this.createWeapon();

        // Aura
        this.createAura();
    }

    createWeapon() {
        const swordGeometry = new THREE.BoxGeometry(3, 20, 1);
        const swordMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x886600
        });
        this.weapon = new THREE.Mesh(swordGeometry, swordMaterial);
        this.weapon.position.set(8, 0, 0);
        this.mesh.add(this.weapon);
    }

    createAura() {
        const auraGeometry = new THREE.SphereGeometry(12, 16, 16);
        const auraMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff41,
            transparent: true,
            opacity: 0.2,
            emissive: 0x00aa00,
            wireframe: true
        });
        this.aura = new THREE.Mesh(auraGeometry, auraMaterial);
        this.mesh.add(this.aura);
    }

    update(character) {
        // Atualizar posição
        if (character) {
            this.mesh.position.set(character.x || 0, character.y || 5, character.z || 0);
        }
    }
}

// Classe Enemy
class Enemy {
    constructor(x, z, type, scene) {
        this.scene = scene;
        this.type = type;
        this.position = { x, y: 5, z };
        this.hp = 50;
        this.maxHp = 50;
        this.createMesh();
    }

    createMesh() {
        const colors = {
            goblin: 0x33aa33,
            orc: 0x664422,
            dragon: 0xff0000,
            demon: 0x990000
        };

        const sizes = {
            goblin: { w: 4, h: 8, d: 4 },
            orc: { w: 6, h: 12, d: 6 },
            dragon: { w: 15, h: 20, d: 30 },
            demon: { w: 8, h: 16, d: 8 }
        };

        const size = sizes[this.type] || sizes.goblin;
        const color = colors[this.type] || 0x00ff00;

        const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.5,
            roughness: 0.7,
            emissive: color
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);

        // Barra de HP
        this.createHPBar();
    }

    createHPBar() {
        const hpGeometry = new THREE.PlaneGeometry(20, 2);
        const hpMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0xff0000
        });
        this.hpBar = new THREE.Mesh(hpGeometry, hpMaterial);
        this.hpBar.position.y = 25;
        this.hpBar.position.z = 0.1;
        this.mesh.add(this.hpBar);
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.updateHPBar();
        return this.hp <= 0;
    }

    updateHPBar() {
        const percentage = Math.max(0, this.hp / this.maxHp);
        this.hpBar.scale.x = percentage;
    }
}

// Classe Particle
class Particle {
    constructor(x, y, z, color, scene) {
        this.scene = scene;
        this.isAlive = true;
        this.life = 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: Math.random() * 2,
            z: (Math.random() - 0.5) * 2
        };

        const geometry = new THREE.SphereGeometry(1, 4, 4);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            metalness: 0.8
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, y, z);
        this.scene.add(this.mesh);
    }

    update() {
        this.mesh.position.x += this.velocity.x;
        this.mesh.position.y += this.velocity.y;
        this.mesh.position.z += this.velocity.z;

        this.life -= 0.02;
        this.mesh.material.opacity = this.life;

        if (this.life <= 0) {
            this.scene.remove(this.mesh);
            this.isAlive = false;
        }
    }
}

// Inicializar cena
let scene3D;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('canvas3d')) {
        scene3D = new Scene3D();
    }
});

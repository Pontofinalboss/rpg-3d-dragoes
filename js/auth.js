/* ==================== SISTEMA DE AUTENTICAÇÃO ==================== */

class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.isAdmin = false;
        this.initAuthListeners();
    }

    initAuthListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const loginTabs = document.querySelectorAll('.tab-btn');

        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        registerForm.addEventListener('submit', (e) => this.handleRegister(e));

        loginTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e));
        });

        // Desenhar animação de fundo
        this.drawLoginBackground();
    }

    switchTab(e) {
        const tabName = e.target.dataset.tab;
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        e.target.classList.add('active');
        document.getElementById(tabName + 'Tab').classList.add('active');

        // Limpar mensagens de erro
        document.querySelectorAll('.error-msg, .success-msg').forEach(msg => {
            msg.textContent = '';
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('loginUser').value;
        const password = document.getElementById('loginPassword').value;

        // Validar campos vazios
        if (!username || !password) {
            document.getElementById('loginError').textContent = '⚠️ Preencha todos os campos!';
            return;
        }

        // Buscar usuário
        const user = this.users.find(u => u.username === username);

        if (!user) {
            document.getElementById('loginUserError').textContent = '❌ Usuário não encontrado!';
            return;
        }

        if (user.password !== password) {
            document.getElementById('loginPasswordError').textContent = '❌ Senha incorreta!';
            return;
        }

        // Login bem-sucedido
        this.currentUser = user;
        this.isAdmin = user.isAdmin || false;
        this.enterGame();
    }

    handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('regUser').value;
        const password = document.getElementById('regPassword').value;
        const passwordConfirm = document.getElementById('regPasswordConfirm').value;

        // Validações
        if (username.length < 3) {
            document.getElementById('regUserError').textContent = '⚠️ Mínimo 3 caracteres!';
            return;
        }

        if (this.users.find(u => u.username === username)) {
            document.getElementById('regUserError').textContent = '❌ Este usuário já existe!';
            return;
        }

        if (password.length < 6) {
            document.getElementById('regPasswordError').textContent = '⚠️ Mínimo 6 caracteres!';
            return;
        }

        if (password !== passwordConfirm) {
            document.getElementById('regPasswordConfirmError').textContent = '❌ Senhas não conferem!';
            return;
        }

        // Criar novo usuário
        const newUser = {
            id: Date.now(),
            username: username,
            password: password,
            level: 1,
            exp: 0,
            gold: 0,
            class: null,
            stats: {
                hp: 100,
                maxHp: 100,
                mana: 50,
                maxMana: 50,
                atk: 10,
                def: 5,
                atkSpd: 1
            },
            inventory: [],
            skills: [],
            quests: [],
            isAdmin: this.users.length === 0 // Primeiro usuário é admin
        };

        this.users.push(newUser);
        this.saveUsers();

        document.getElementById('registerSuccess').textContent = '✅ Conta criada! Faça login para começar!';
        
        // Limpar formulário
        document.getElementById('registerForm').reset();
        document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');

        // Ir para login
        setTimeout(() => {
            document.querySelector('[data-tab="login"]').click();
        }, 1500);
    }

    enterGame() {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        
        // Inicializar jogo
        gameManager.initialize(this.currentUser);
        
        // Se for admin, mostrar painel de admin
        if (this.isAdmin) {
            setTimeout(() => {
                adminPanel.show();
            }, 1000);
        }
    }

    loadUsers() {
        const saved = localStorage.getItem('rpg_users');
        if (!saved) {
            // Usuário admin padrão
            return [{
                id: 1,
                username: 'admin',
                password: 'admin123',
                level: 100,
                exp: 9999,
                gold: 99999,
                class: 'mago',
                stats: {
                    hp: 500,
                    maxHp: 500,
                    mana: 500,
                    maxMana: 500,
                    atk: 100,
                    def: 50,
                    atkSpd: 3
                },
                inventory: [],
                skills: [],
                quests: [],
                isAdmin: true
            }];
        }
        return JSON.parse(saved);
    }

    saveUsers() {
        localStorage.setItem('rpg_users', JSON.stringify(this.users));
    }

    updateCurrentUser() {
        this.users = this.users.map(u => u.id === this.currentUser.id ? this.currentUser : u);
        this.saveUsers();
    }

    drawLoginBackground() {
        const canvas = document.getElementById('loginCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 255, 65, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Criar partículas
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Desenhar linhas entre partículas próximas
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 255, 65, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        // Redimensionar canvas ao mudar tamanho da janela
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Inicializar autenticação
const authManager = new AuthManager();

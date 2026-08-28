/* ==================== GERENCIADOR PRINCIPAL DO JOGO ==================== */

class GameManager {
    constructor() {
        this.character = null;
        this.scene = null;
        this.combat = null;
        this.isRunning = false;
    }

    initialize(user) {
        // Criar personagem
        this.character = new Character(user);
        
        // Se não tem classe, mostrar seleção
        if (!this.character.class) {
            this.showClassSelection();
        } else {
            this.startGame();
        }
    }

    showClassSelection() {
        const modal = document.getElementById('classSelectionModal');
        modal.style.display = 'flex';

        document.querySelectorAll('.class-card').forEach(card => {
            card.addEventListener('click', () => {
                const selectedClass = card.dataset.class;
                this.character.selectClass(selectedClass);
                modal.style.display = 'none';
                this.startGame();
            });
        });
    }

    startGame() {
        this.isRunning = true;
        
        // Inicializar UI
        uiManager.setCharacter(this.character);
        
        // Inicializar combate
        this.combat = new CombatSystem(this.character);
        
        // Gerar quests iniciais
        guildQuestBoard.generateDailyQuests();
        
        // Criar jogador na cena 3D
        if (scene3D) {
            scene3D.createPlayer();
        }
        
        // Adicionar exemplos de inimigos
        if (scene3D) {
            const positions = [
                { x: -80, z: -80, type: 'goblin' },
                { x: 80, z: -80, type: 'orc' },
                { x: 0, z: 150, type: 'specter' }
            ];
            positions.forEach(pos => {
                const enemyData = enemyManager.getRandomEnemy(this.character.level + 5);
                const enemy = scene3D.spawnEnemy(pos.x, pos.z, pos.type);
            });
        }
        
        combatLog.addEntry('Bem-vindo ao Reino do Eskai!', 'info');
        combatLog.addEntry(`Você é um ${this.character.class} nível ${this.character.level}`, 'info');
        
        this.setupGameControls();
    }

    setupGameControls() {
        // Teclas de combate podem ser adicionadas aqui
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Menu de pausa
            }
        });
    }

    update() {
        if (!this.isRunning || !this.character) return;
        
        // Regeneração de Mana
        if (this.character.stats.mana < this.character.stats.maxMana) {
            this.character.stats.mana += 0.5;
        }
        
        // Regeneração de HP (fora de combate)
        if (!this.character.inCombat && this.character.stats.hp < this.character.stats.maxHp) {
            this.character.stats.hp += 0.3;
        }
        
        uiManager.updateHUD();
    }
}

const gameManager = new GameManager();

// Loop de atualização do jogo
setInterval(() => {
    gameManager.update();
}, 100);

// Adicionar eventos para teste de combate
document.addEventListener('DOMContentLoaded', () => {
    // Teste: Iniciar combate com botão de teste (remover em produção)
    window.testCombat = () => {
        if (gameManager.character) {
            const randomEnemy = enemyManager.getRandomEnemy(gameManager.character.level);
            gameManager.combat.startCombat(randomEnemy);
        }
    };

    window.testAttack = () => {
        if (gameManager.combat.isInCombat) {
            gameManager.combat.playerAttack(0);
            uiManager.updateHUD();
        }
    };
});
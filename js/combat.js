/* ==================== SISTEMA DE COMBATE ==================== */

class CombatSystem {
    constructor(character) {
        this.character = character;
        this.enemy = null;
        this.isInCombat = false;
        this.combatLog = [];
        this.turn = 0;
    }

    startCombat(enemyData) {
        this.enemy = {
            ...enemyData,
            currentHp: enemyData.hp
        };
        this.isInCombat = true;
        this.character.inCombat = true;
        this.character.currentEnemy = this.enemy;
        this.combatLog = [];
        this.turn = 0;

        combatLog.addEntry(`⚔️ Iniciou combate com ${this.enemy.name}!`, 'info');
        return this.enemy;
    }

    playerAttack(skillIndex = null) {
        if (!this.isInCombat || !this.enemy) return null;

        let damage = this.character.stats.atk;
        let skillUsed = false;
        let skillName = 'Ataque Básico';

        if (skillIndex !== null) {
            const skill = this.character.useSkill(skillIndex, this.enemy);
            if (skill) {
                skillUsed = true;
                skillName = skill.name;
                damage = skill.damage + (this.character.stats.atk * 0.5);
            } else {
                return null;
            }
        }

        // Adicionar variação
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4));

        // Aplicar dano
        const actualDamage = this.enemy.currentHp -= damage;
        
        combatLog.addEntry(`💥 ${skillName}: ${damage} de dano!`, 'damage');

        // Verificar se inimigo morreu
        if (this.enemy.currentHp <= 0) {
            this.endCombat(true);
            return { damage, victory: true };
        }

        // IA do inimigo contra-ataca
        this.enemyAttack();

        return { damage, victory: false };
    }

    enemyAttack() {
        if (!this.isInCombat || !this.enemy) return;

        let damage = this.enemy.atk;
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4));

        const actualDamage = this.character.takeDamage(damage);
        combatLog.addEntry(`🔥 ${this.enemy.name} ataca: ${Math.floor(actualDamage)} de dano!`, 'damage');

        // Verificar se jogador morreu
        if (this.character.stats.hp <= 0) {
            this.endCombat(false);
        }
    }

    playerDefend() {
        if (!this.isInCombat || !this.enemy) return;

        combatLog.addEntry('🛡️ Você se posicionou defensivamente!', 'buff');
        
        // Reduzir próximo dano
        let damage = Math.floor(this.enemy.atk * 0.4);
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4));
        const actualDamage = this.character.takeDamage(damage);
        combatLog.addEntry(`🔥 ${this.enemy.name} ataca: ${Math.floor(actualDamage)} de dano (reduzido)!`, 'damage');
    }

    endCombat(victory) {
        this.isInCombat = false;
        this.character.inCombat = false;

        if (victory) {
            this.character.gainExp(this.enemy.expReward);
            this.character.gold += this.enemy.goldReward;
            combatLog.addEntry(`✨ Vitória! +${this.enemy.expReward} EXP e ${this.enemy.goldReward} ouro!`, 'success');
            
            // Dropar itens
            if (this.enemy.loot && this.enemy.loot.length > 0) {
                const lootId = this.enemy.loot[Math.floor(Math.random() * this.enemy.loot.length)];
                const lootItem = itemManager.getItemById(lootId);
                if (lootItem) {
                    this.character.addItem({ ...lootItem, quantity: 1 });
                    combatLog.addEntry(`💎 Você obteve: ${lootItem.emoji} ${lootItem.name}!`, 'success');
                }
            }
        } else {
            combatLog.addEntry('💀 Você foi derrotado!', 'danger');
            this.character.stats.hp = Math.floor(this.character.stats.maxHp * 0.3);
            this.character.gold = Math.floor(this.character.gold * 0.5);
        }

        this.enemy = null;
    }
}

class CombatLog {
    constructor() {
        this.entries = [];
        this.maxEntries = 50;
    }

    addEntry(message, type = 'info') {
        const entry = {
            message,
            type,
            timestamp: Date.now()
        };
        this.entries.push(entry);
        
        if (this.entries.length > this.maxEntries) {
            this.entries.shift();
        }

        this.updateUI();
    }

    updateUI() {
        const logElement = document.getElementById('combatLog');
        if (!logElement) return;

        logElement.innerHTML = this.entries.map(entry => 
            `<p class="log-entry ${entry.type}">${entry.message}</p>`
        ).join('');

        // Scroll para o final
        logElement.scrollTop = logElement.scrollHeight;
    }

    clear() {
        this.entries = [];
        this.updateUI();
    }
}

const combatLog = new CombatLog();
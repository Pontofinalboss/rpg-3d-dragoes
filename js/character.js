/* ==================== SISTEMA DE PERSONAGENS ==================== */

class Character {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.level = user.level || 1;
        this.exp = user.exp || 0;
        this.expToLevel = 100 * this.level;
        this.gold = user.gold || 0;
        this.class = user.class || null;
        this.stats = user.stats || {
            hp: 100,
            maxHp: 100,
            mana: 50,
            maxMana: 50,
            atk: 10,
            def: 5,
            atkSpd: 1
        };
        this.inventory = user.inventory || [];
        this.equipment = {};
        this.skills = user.skills || [];
        this.quests = user.quests || [];
        this.position = { x: 0, y: 0, z: 0 };
        this.inCombat = false;
        this.currentEnemy = null;
    }

    selectClass(className) {
        const classStats = {
            aventureiro: {
                hp: 150,
                maxHp: 150,
                mana: 30,
                maxMana: 30,
                atk: 20,
                def: 15,
                atkSpd: 1.2
            },
            mago: {
                hp: 100,
                maxHp: 100,
                mana: 100,
                maxMana: 100,
                atk: 30,
                def: 5,
                atkSpd: 0.8
            },
            paladino: {
                hp: 180,
                maxHp: 180,
                mana: 60,
                maxMana: 60,
                atk: 15,
                def: 25,
                atkSpd: 1
            }
        };

        this.class = className;
        this.stats = classStats[className] || classStats.aventureiro;
        this.addSkillByClass(className);
    }

    addSkillByClass(className) {
        const skills = {
            aventureiro: [
                { name: 'Golpe Básico', damage: 20, mana: 0, cooldown: 1 },
                { name: 'Investida', damage: 40, mana: 10, cooldown: 5 },
                { name: 'Defesa', damage: 0, mana: 5, cooldown: 3 }
            ],
            mago: [
                { name: 'Projétil Arcano', damage: 35, mana: 15, cooldown: 2 },
                { name: 'Bola de Fogo', damage: 60, mana: 30, cooldown: 6 },
                { name: 'Teleporte', damage: 0, mana: 20, cooldown: 8 }
            ],
            paladino: [
                { name: 'Golpe Sagrado', damage: 25, mana: 10, cooldown: 2 },
                { name: 'Cura', damage: 0, mana: 25, cooldown: 4 },
                { name: 'Proteção Divina', damage: 0, mana: 15, cooldown: 6 }
            ]
        };

        this.skills = skills[className] || [];
    }

    gainExp(amount) {
        this.exp += amount;
        if (this.exp >= this.expToLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.exp = 0;
        this.expToLevel = 100 * this.level;
        this.stats.hp = Math.floor(this.stats.hp * 1.1);
        this.stats.maxHp = this.stats.hp;
        this.stats.mana = Math.floor(this.stats.mana * 1.1);
        this.stats.maxMana = this.stats.mana;
        this.stats.atk = Math.floor(this.stats.atk * 1.08);
        this.stats.def = Math.floor(this.stats.def * 1.08);
        
        combatLog.addEntry(`⭐ LEVEL UP! Agora você é nível ${this.level}!`, 'success');
    }

    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - (this.stats.def * 0.1));
        this.stats.hp = Math.max(0, this.stats.hp - actualDamage);
        return actualDamage;
    }

    heal(amount) {
        const healed = Math.min(this.stats.maxHp - this.stats.hp, amount);
        this.stats.hp += healed;
        return healed;
    }

    useMana(amount) {
        if (this.stats.mana >= amount) {
            this.stats.mana -= amount;
            return true;
        }
        return false;
    }

    equipItem(item) {
        if (item.type === 'weapon') {
            this.equipment.weapon = item;
            this.stats.atk += item.bonus;
        } else if (item.type === 'armor') {
            this.equipment.armor = item;
            this.stats.def += item.bonus;
        }
    }

    useSkill(skillIndex, target) {
        const skill = this.skills[skillIndex];
        if (!skill) return false;

        if (!this.useMana(skill.mana)) {
            combatLog.addEntry('❌ Mana insuficiente!', 'danger');
            return false;
        }

        return skill;
    }

    addItem(item) {
        const existingItem = this.inventory.find(i => i.id === item.id);
        if (existingItem && item.stackable) {
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
        } else {
            this.inventory.push(item);
        }
    }

    removeItem(itemId) {
        this.inventory = this.inventory.filter(i => i.id !== itemId);
    }

    acceptQuest(quest) {
        const newQuest = { ...quest, progress: 0, startedAt: Date.now(), completed: false };
        this.quests.push(newQuest);
    }

    completeQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (quest) {
            quest.completed = true;
            this.gold += quest.reward;
            this.gainExp(quest.expReward);
        }
    }
}

class ItemManager {
    constructor() {
        this.items = this.loadItems();
        this.weapons = this.items.filter(i => i.type === 'weapon');
        this.armor = this.items.filter(i => i.type === 'armor');
        this.consumables = this.items.filter(i => i.type === 'consumable');
    }

    loadItems() {
        return [
            // Armas Lendárias
            {
                id: 1,
                name: 'Excalibur',
                type: 'weapon',
                damage: 100,
                bonus: 50,
                rarity: 'legendary',
                description: 'Lendária espada dos deuses',
                emoji: '⚔️'
            },
            {
                id: 2,
                name: 'Dragão Furor',
                type: 'weapon',
                damage: 80,
                bonus: 40,
                rarity: 'epic',
                description: 'Machado lendário que queima em chamas',
                emoji: '🪓'
            },
            {
                id: 3,
                name: 'Báculo Arcano',
                type: 'weapon',
                damage: 90,
                bonus: 45,
                rarity: 'legendary',
                description: 'Báculo supremo dos magos',
                emoji: '🔮'
            },
            // Armaduras
            {
                id: 4,
                name: 'Armadura de Dragão',
                type: 'armor',
                defense: 50,
                bonus: 50,
                rarity: 'legendary',
                description: 'Armadura forjada com escamas de dragão',
                emoji: '🛡️'
            },
            {
                id: 5,
                name: 'Pele de Fênix',
                type: 'armor',
                defense: 40,
                bonus: 40,
                rarity: 'epic',
                description: 'Armadura que regenera com o tempo',
                emoji: '🔥'
            },
            // Consumíveis
            {
                id: 6,
                name: 'Poção de Vida',
                type: 'consumable',
                heal: 50,
                rarity: 'common',
                description: 'Recupera 50 HP',
                emoji: '🧪',
                stackable: true
            },
            {
                id: 7,
                name: 'Elixir Sagrado',
                type: 'consumable',
                heal: 150,
                rarity: 'rare',
                description: 'Recupera 150 HP e remove debuffs',
                emoji: '✨',
                stackable: true
            },
            {
                id: 8,
                name: 'Mana Crystal',
                type: 'consumable',
                mana: 100,
                rarity: 'rare',
                description: 'Recupera 100 de Mana',
                emoji: '💎',
                stackable: true
            }
        ];
    }

    getItemById(id) {
        return this.items.find(i => i.id === id);
    }

    getRandomItem(rarity = 'common') {
        const rarityItems = this.items.filter(i => i.rarity === rarity);
        return rarityItems[Math.floor(Math.random() * rarityItems.length)];
    }
}

class EnemyManager {
    constructor() {
        this.enemies = this.loadEnemies();
    }

    loadEnemies() {
        return [
            {
                id: 1,
                name: 'Goblin',
                type: 'goblin',
                level: 1,
                hp: 20,
                atk: 5,
                def: 1,
                expReward: 50,
                goldReward: 10,
                loot: [6],
                emoji: '👹'
            },
            {
                id: 2,
                name: 'Orc Guerreiro',
                type: 'orc',
                level: 3,
                hp: 50,
                atk: 12,
                def: 5,
                expReward: 100,
                goldReward: 25,
                loot: [6, 7],
                emoji: '🗡️'
            },
            {
                id: 3,
                name: 'Dragão Antigo',
                type: 'dragon',
                level: 20,
                hp: 500,
                atk: 60,
                def: 30,
                expReward: 5000,
                goldReward: 500,
                loot: [1, 4],
                emoji: '🐉'
            },
            {
                id: 4,
                name: 'Demônio',
                type: 'demon',
                level: 15,
                hp: 300,
                atk: 50,
                def: 20,
                expReward: 3000,
                goldReward: 300,
                loot: [3, 8],
                emoji: '👿'
            },
            {
                id: 5,
                name: 'Espectro',
                type: 'specter',
                level: 5,
                hp: 40,
                atk: 15,
                def: 3,
                expReward: 150,
                goldReward: 50,
                loot: [6],
                emoji: '👻'
            },
            {
                id: 6,
                name: 'Lobo Sombrio',
                type: 'wolf',
                level: 2,
                hp: 30,
                atk: 8,
                def: 2,
                expReward: 75,
                goldReward: 20,
                loot: [6],
                emoji: '🐺'
            },
            {
                id: 7,
                name: 'Mago Negro',
                type: 'mage',
                level: 10,
                hp: 100,
                atk: 40,
                def: 8,
                expReward: 800,
                goldReward: 150,
                loot: [3, 8],
                emoji: '🧙'
            }
        ];
    }

    getEnemyById(id) {
        return this.enemies.find(e => e.id === id);
    }

    getRandomEnemy(maxLevel = 5) {
        const validEnemies = this.enemies.filter(e => e.level <= maxLevel);
        return validEnemies[Math.floor(Math.random() * validEnemies.length)];
    }
}

const itemManager = new ItemManager();
const enemyManager = new EnemyManager();
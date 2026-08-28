/* ==================== SISTEMA DE SKILLS/HABILIDADES ==================== */

class SkillSystem {
    constructor() {
        this.allSkills = this.loadAllSkills();
        this.skillTree = this.loadSkillTree();
    }

    loadAllSkills() {
        return {
            aventureiro: [
                {
                    id: 1,
                    name: 'Golpe Básico',
                    emoji: '⚔️',
                    damage: 20,
                    mana: 0,
                    cooldown: 1,
                    level: 1,
                    description: 'Um golpe rápido com sua arma'
                },
                {
                    id: 2,
                    name: 'Investida',
                    emoji: '🏃',
                    damage: 40,
                    mana: 10,
                    cooldown: 5,
                    level: 5,
                    description: 'Corra em direção ao inimigo causando dano'
                },
                {
                    id: 3,
                    name: 'Defesa Absoluta',
                    emoji: '🛡️',
                    damage: 0,
                    mana: 15,
                    cooldown: 4,
                    level: 10,
                    description: 'Se defender reduzindo dano em 50%'
                },
                {
                    id: 4,
                    name: 'Grito de Guerra',
                    emoji: '📢',
                    damage: 30,
                    mana: 20,
                    cooldown: 6,
                    level: 15,
                    description: 'Grite para aumentar ataque e defesa'
                }
            ],
            mago: [
                {
                    id: 101,
                    name: 'Projétil Arcano',
                    emoji: '✨',
                    damage: 35,
                    mana: 15,
                    cooldown: 2,
                    level: 1,
                    description: 'Lance uma bola de magia arcana'
                },
                {
                    id: 102,
                    name: 'Bola de Fogo',
                    emoji: '🔥',
                    damage: 60,
                    mana: 30,
                    cooldown: 6,
                    level: 5,
                    description: 'Conjure uma explosão de fogo'
                },
                {
                    id: 103,
                    name: 'Teleporte',
                    emoji: '💫',
                    damage: 0,
                    mana: 20,
                    cooldown: 8,
                    level: 10,
                    description: 'Se teletransporte para longe do inimigo'
                },
                {
                    id: 104,
                    name: 'Congelamento',
                    emoji: '❄️',
                    damage: 45,
                    mana: 25,
                    cooldown: 5,
                    level: 15,
                    description: 'Congele o inimigo reduzindo seu ataque'
                }
            ],
            paladino: [
                {
                    id: 201,
                    name: 'Golpe Sagrado',
                    emoji: '⚡',
                    damage: 25,
                    mana: 10,
                    cooldown: 2,
                    level: 1,
                    description: 'Um golpe infundido com poder divino'
                },
                {
                    id: 202,
                    name: 'Cura Sagrada',
                    emoji: '🙏',
                    damage: 0,
                    mana: 25,
                    cooldown: 4,
                    heal: 50,
                    level: 5,
                    description: 'Cure-se ou cure um aliado'
                },
                {
                    id: 203,
                    name: 'Proteção Divina',
                    emoji: '⭐',
                    damage: 0,
                    mana: 20,
                    cooldown: 6,
                    level: 10,
                    description: 'Crie um escudo de proteção divina'
                },
                {
                    id: 204,
                    name: 'Ressurreição',
                    emoji: '👼',
                    damage: 0,
                    mana: 50,
                    cooldown: 10,
                    level: 20,
                    description: 'Ressuscite um aliado caído'
                }
            ]
        };
    }

    loadSkillTree() {
        return {
            aventureiro: [
                { level: 1, skillId: 1 },
                { level: 5, skillId: 2 },
                { level: 10, skillId: 3 },
                { level: 15, skillId: 4 }
            ],
            mago: [
                { level: 1, skillId: 101 },
                { level: 5, skillId: 102 },
                { level: 10, skillId: 103 },
                { level: 15, skillId: 104 }
            ],
            paladino: [
                { level: 1, skillId: 201 },
                { level: 5, skillId: 202 },
                { level: 10, skillId: 203 },
                { level: 20, skillId: 204 }
            ]
        };
    }

    getSkillsByClass(className) {
        return this.allSkills[className] || [];
    }

    getSkillById(skillId) {
        for (let classSkills of Object.values(this.allSkills)) {
            const skill = classSkills.find(s => s.id === skillId);
            if (skill) return skill;
        }
        return null;
    }

    getUnlockedSkills(character) {
        const skillTree = this.skillTree[character.class];
        if (!skillTree) return [];
        
        return skillTree
            .filter(skill => character.level >= skill.level)
            .map(skill => this.getSkillById(skill.skillId));
    }
}

const skillSystem = new SkillSystem();
/* ==================== SISTEMA DE QUESTS ==================== */

class QuestManager {
    constructor() {
        this.quests = this.loadQuests();
        this.guildQuests = [];
    }

    loadQuests() {
        return [
            {
                id: 1,
                name: 'Derrote os Goblins',
                description: 'Há goblins invadindo a aldeia. Derrote 5 deles!',
                type: 'kill',
                target: 'goblin',
                targetCount: 5,
                reward: 500,
                expReward: 200,
                rarity: 'common',
                npc: 'Guarda da Vila',
                emoji: '👹'
            },
            {
                id: 2,
                name: 'A Ameaça Orc',
                description: 'Os orcs estão atacando as rotas comerciais. Elimine 10 deles.',
                type: 'kill',
                target: 'orc',
                targetCount: 10,
                reward: 1000,
                expReward: 500,
                rarity: 'rare',
                npc: 'Capitão da Guarda',
                emoji: '🗡️'
            },
            {
                id: 3,
                name: 'O Dragão Antigo',
                description: 'Um dragão antigo aterroriza as terras. Você é capaz de enfrentá-lo?',
                type: 'kill',
                target: 'dragon',
                targetCount: 1,
                reward: 5000,
                expReward: 5000,
                rarity: 'legendary',
                npc: 'Rei',
                emoji: '🐉'
            },
            {
                id: 4,
                name: 'Coleta de Cristais',
                description: 'Colete 10 cristais espalhados pela floresta.',
                type: 'collect',
                target: 'crystal',
                targetCount: 10,
                reward: 300,
                expReward: 150,
                rarity: 'common',
                npc: 'Mercador de Cristais',
                emoji: '💎'
            },
            {
                id: 5,
                name: 'Investigar a Torre Sombria',
                description: 'Investigue os mistérios da Torre Sombria e derrote seu guardião.',
                type: 'explore',
                target: 'tower',
                reward: 2000,
                expReward: 1000,
                rarity: 'epic',
                npc: 'Sábio Antigo',
                emoji: '🔮'
            },
            {
                id: 6,
                name: 'Resgate do Aldeão',
                description: 'Resgate um aldeão capturado pelos demônios.',
                type: 'escort',
                target: 'villager',
                reward: 1500,
                expReward: 750,
                rarity: 'rare',
                npc: 'Mãe do Aldeão',
                emoji: '👨'
            }
        ];
    }

    getQuestById(id) {
        return this.quests.find(q => q.id === id);
    }

    getQuestsByRarity(rarity) {
        return this.quests.filter(q => q.rarity === rarity);
    }

    getRandomQuest() {
        return this.quests[Math.floor(Math.random() * this.quests.length)];
    }
}

class GuildQuestBoard {
    constructor() {
        this.questManager = new QuestManager();
        this.availableQuests = [];
        this.userQuests = [];
    }

    generateDailyQuests() {
        this.availableQuests = [
            this.questManager.getRandomQuest(),
            this.questManager.getRandomQuest(),
            this.questManager.getRandomQuest()
        ];
        return this.availableQuests;
    }

    acceptQuest(questId, character) {
        const quest = this.questManager.getQuestById(questId);
        if (quest) {
            character.acceptQuest(quest);
            combatLog.addEntry(`📜 Quest aceita: ${quest.name}`, 'info');
        }
    }

    updateQuestProgress(questId, character, amount = 1) {
        const quest = character.quests.find(q => q.id === questId);
        if (quest) {
            quest.progress = (quest.progress || 0) + amount;
            if (quest.progress >= (quest.targetCount || 1)) {
                this.completeQuest(questId, character);
            }
        }
    }

    completeQuest(questId, character) {
        const quest = character.quests.find(q => q.id === questId);
        if (quest && !quest.completed) {
            character.completeQuest(questId);
            combatLog.addEntry(`✨ Quest completada: ${quest.name}! +${quest.reward} ouro e ${quest.expReward} EXP!`, 'success');
        }
    }
}

const guildQuestBoard = new GuildQuestBoard();
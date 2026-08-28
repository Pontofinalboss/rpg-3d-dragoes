/* ==================== SISTEMA DE ACHIEVEMENTS ==================== */

class AchievementSystem {
    constructor() {
        this.achievements = this.loadAchievements();
        this.unlockedAchievements = [];
    }

    loadAchievements() {
        return [
            {
                id: 1,
                name: 'Primeiro Passo',
                description: 'Derrote seu primeiro inimigo',
                icon: '⚔️',
                points: 10,
                unlockedAt: null
            },
            {
                id: 2,
                name: 'Lendário',
                description: 'Obtenha um item lendário',
                icon: '👑',
                points: 50,
                unlockedAt: null
            },
            {
                id: 3,
                name: 'Nível 10',
                description: 'Alcance o nível 10',
                icon: '⭐',
                points: 25,
                unlockedAt: null
            },
            {
                id: 4,
                name: 'Rico',
                description: 'Acumule 10.000 de ouro',
                icon: '💰',
                points: 40,
                unlockedAt: null
            },
            {
                id: 5,
                name: 'Dragão Morto',
                description: 'Derrote o Dragão Antigo',
                icon: '🐉',
                points: 100,
                unlockedAt: null
            },
            {
                id: 6,
                name: 'Completionist',
                description: 'Complete 10 quests',
                icon: '🎯',
                points: 60,
                unlockedAt: null
            },
            {
                id: 7,
                name: 'Mago Arcano',
                description: 'Aprenda todas as magias do Mago',
                icon: '🔮',
                points: 45,
                unlockedAt: null
            },
            {
                id: 8,
                name: 'Sem Derrota',
                description: 'Vença 10 combates em sequência',
                icon: '🏆',
                points: 75,
                unlockedAt: null
            }
        ];
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlockedAt) {
            achievement.unlockedAt = Date.now();
            this.unlockedAchievements.push(achievement);
            notificationSystem.show(
                `🏆 Achievement Desbloqueado: ${achievement.name}! +${achievement.points} pontos`,
                'success'
            );
            return true;
        }
        return false;
    }

    getTotalPoints() {
        return this.unlockedAchievements.reduce((sum, a) => sum + a.points, 0);
    }
}

const achievementSystem = new AchievementSystem();
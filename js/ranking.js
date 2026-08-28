/* ==================== SISTEMA DE RANKING ==================== */

class RankingSystem {
    constructor() {
        this.rankings = this.loadRankings();
    }

    loadRankings() {
        const saved = localStorage.getItem('rpg_rankings');
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }

    updateRanking(character) {
        // Remover jogador anterior se existir
        this.rankings = this.rankings.filter(r => r.id !== character.id);

        // Adicionar novo ranking
        this.rankings.push({
            id: character.id,
            username: character.username,
            level: character.level,
            exp: character.exp,
            gold: character.gold,
            class: character.class,
            lastUpdated: Date.now()
        });

        // Ordenar por nível e experiência
        this.rankings.sort((a, b) => {
            if (b.level !== a.level) return b.level - a.level;
            return b.exp - a.exp;
        });

        this.saveRankings();
    }

    saveRankings() {
        localStorage.setItem('rpg_rankings', JSON.stringify(this.rankings));
    }

    getPlayerRank(playerId) {
        return this.rankings.findIndex(r => r.id === playerId) + 1;
    }

    getTopPlayers(limit = 10) {
        return this.rankings.slice(0, limit);
    }

    displayRankings() {
        let rankingText = '🏆 RANKING GLOBAL 🏆\n\n';
        this.rankings.slice(0, 10).forEach((player, index) => {
            rankingText += `${index + 1}. ${player.username}\n`;
            rankingText += `   Level ${player.level} | ${player.class}\n`;
            rankingText += `   Ouro: ${player.gold}\n\n`;
        });
        return rankingText;
    }
}

const rankingSystem = new RankingSystem();
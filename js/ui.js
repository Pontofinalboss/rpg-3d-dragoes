/* ==================== SISTEMA DE UI ==================== */

class UIManager {
    constructor() {
        this.character = null;
        this.initMenuListeners();
    }

    setCharacter(character) {
        this.character = character;
        this.updateHUD();
    }

    initMenuListeners() {
        document.getElementById('btnInventory')?.addEventListener('click', () => this.toggleInventory());
        document.getElementById('btnSkills')?.addEventListener('click', () => this.toggleSkills());
        document.getElementById('btnQuests')?.addEventListener('click', () => this.toggleQuests());
        document.getElementById('btnGuild')?.addEventListener('click', () => this.toggleGuild());
        document.getElementById('btnMap')?.addEventListener('click', () => this.toggleMap());
        document.getElementById('btnSettings')?.addEventListener('click', () => this.toggleSettings());
        document.getElementById('btnLogout')?.addEventListener('click', () => this.logout());
    }

    updateHUD() {
        if (!this.character) return;

        document.getElementById('hudName').textContent = this.character.username;
        document.getElementById('hudLevel').textContent = this.character.level;
        document.getElementById('hudClass').textContent = this.character.class || 'Sem Classe';
        document.getElementById('hudExp').textContent = `${this.character.exp}/${this.character.expToLevel}`;
        document.getElementById('hudGold').textContent = this.character.gold;

        // Atualizar barras
        const hpPercent = (this.character.stats.hp / this.character.stats.maxHp) * 100;
        const manaPercent = (this.character.stats.mana / this.character.stats.maxMana) * 100;

        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('hpText').textContent = `${Math.floor(this.character.stats.hp)}/${this.character.stats.maxHp}`;

        document.getElementById('manaBar').style.width = manaPercent + '%';
        document.getElementById('manaText').textContent = `${Math.floor(this.character.stats.mana)}/${this.character.stats.maxMana}`;

        // Atualizar inventário
        this.updateInventoryDisplay();

        // Atualizar quests
        this.updateQuestDisplay();
    }

    updateInventoryDisplay() {
        const grid = document.getElementById('inventoryGrid');
        if (!grid) return;

        grid.innerHTML = this.character.inventory.map((item, index) => `
            <div class="inventory-slot rarity-${item.rarity}" title="${item.name}">
                ${item.emoji}
                ${item.quantity ? `<span style="font-size: 0.7em;">${item.quantity}</span>` : ''}
            </div>
        `).join('');
    }

    updateQuestDisplay() {
        const questList = document.getElementById('questList');
        if (!questList || !this.character.quests.length) {
            questList.innerHTML = '<p class="no-data">Nenhuma quest ativa</p>';
            return;
        }

        questList.innerHTML = this.character.quests
            .filter(q => !q.completed)
            .map(q => `
                <div class="quest-item">
                    <div class="quest-title">${q.emoji} ${q.name}</div>
                    <div class="quest-progress">Progresso: ${q.progress}/${q.targetCount || 1}</div>
                </div>
            `).join('');
    }

    toggleInventory() {
        alert('Inventário:\n' + this.character.inventory.map(i => `${i.emoji} ${i.name}`).join('\n') || 'Vazio');
    }

    toggleSkills() {
        let skillsText = `Habilidades de ${this.character.class}:\n\n`;
        this.character.skills.forEach((skill, i) => {
            skillsText += `${i + 1}. ${skill.name} (Dano: ${skill.damage}, Mana: ${skill.mana})\n`;
        });
        alert(skillsText);
    }

    toggleQuests() {
        if (!this.character.quests.length) {
            alert('Você não tem quests ativas');
            return;
        }
        let questsText = 'Quests Ativas:\n\n';
        this.character.quests.forEach(q => {
            questsText += `${q.emoji} ${q.name}\nProgresso: ${q.progress}/${q.targetCount || 1}\n\n`;
        });
        alert(questsText);
    }

    toggleGuild() {
        const quests = guildQuestBoard.generateDailyQuests();
        let questsText = 'Quests Disponíveis na Guilda:\n\n';
        quests.forEach((q, i) => {
            questsText += `${i + 1}. ${q.emoji} ${q.name}\nRecompensa: ${q.reward} ouro\n\n`;
        });
        alert(questsText);
    }

    toggleMap() {
        alert('🗺️ Mapa do Reino\n\nLocais:\n- 🏛️ Aldeia (Centro)\n- 🏔️ Montanhas\n- 🌲 Floresta Sombria\n- 🔮 Torre Arcana\n- 🐉 Covil do Dragão');
    }

    toggleSettings() {
        alert('⚙️ Configurações\n\nSom: Ativado\nGráficos: Alto\nDificuldade: Normal');
    }

    logout() {
        if (confirm('Tem certeza que deseja fazer logout?')) {
            authManager.updateCurrentUser();
            document.getElementById('gameContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'flex';
            location.reload();
        }
    }
}

const uiManager = new UIManager();
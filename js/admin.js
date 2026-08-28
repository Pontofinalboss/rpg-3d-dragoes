/* ==================== PAINEL DE ADMINISTRADOR ==================== */

class AdminPanel {
    constructor() {
        this.isOpen = false;
        this.initListeners();
    }

    initListeners() {
        document.getElementById('closeAdminPanel')?.addEventListener('click', () => this.hide());

        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });

        document.getElementById('btnAddItem')?.addEventListener('click', () => this.showAddItemForm());
        document.getElementById('btnAddMonster')?.addEventListener('click', () => this.showAddMonsterForm());
        document.getElementById('btnAddQuest')?.addEventListener('click', () => this.showAddQuestForm());
    }

    show() {
        document.getElementById('adminPanel').style.display = 'flex';
        this.isOpen = true;
        this.loadUsersList();
        this.loadItemsList();
        this.loadMonstersList();
        this.loadQuestsList();
    }

    hide() {
        document.getElementById('adminPanel').style.display = 'none';
        this.isOpen = false;
    }

    switchTab(e) {
        const tabName = e.target.dataset.adminTab;
        const buttons = document.querySelectorAll('.admin-tab-btn');
        const contents = document.querySelectorAll('.admin-tab-content');

        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        e.target.classList.add('active');
        document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
    }

    loadUsersList() {
        const users = authManager.users;
        const list = document.getElementById('adminUsersList');
        
        list.innerHTML = users.map(user => `
            <div class="admin-list-item">
                <div class="admin-list-item-info">
                    <h4>${user.username} ${user.isAdmin ? '👑' : ''}</h4>
                    <p>Level: ${user.level} | Ouro: ${user.gold} | Classe: ${user.class || 'Sem classe'}</p>
                </div>
                <div class="admin-list-item-actions">
                    <button class="btn-admin" onclick="adminPanel.editUser(${user.id})">Editar</button>
                    <button class="btn-admin danger" onclick="adminPanel.deleteUser(${user.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    loadItemsList() {
        const items = itemManager.items;
        const list = document.getElementById('adminItemsList');
        
        list.innerHTML = items.map(item => `
            <div class="admin-list-item">
                <div class="admin-list-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>${item.description}</p>
                    <p>Raridade: <span style="color: var(--border-color)">${item.rarity}</span></p>
                </div>
                <div class="admin-list-item-actions">
                    <button class="btn-admin" onclick="adminPanel.editItem(${item.id})">Editar</button>
                    <button class="btn-admin danger" onclick="adminPanel.deleteItem(${item.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    loadMonstersList() {
        const monsters = enemyManager.enemies;
        const list = document.getElementById('adminMonstersList');
        
        list.innerHTML = monsters.map(monster => `
            <div class="admin-list-item">
                <div class="admin-list-item-info">
                    <h4>${monster.emoji} ${monster.name}</h4>
                    <p>Level: ${monster.level} | HP: ${monster.hp} | ATK: ${monster.atk} | DEF: ${monster.def}</p>
                    <p>Recompensa: ${monster.expReward} EXP | ${monster.goldReward} ouro</p>
                </div>
                <div class="admin-list-item-actions">
                    <button class="btn-admin" onclick="adminPanel.editMonster(${monster.id})">Editar</button>
                    <button class="btn-admin danger" onclick="adminPanel.deleteMonster(${monster.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    loadQuestsList() {
        const quests = guildQuestBoard.questManager.quests;
        const list = document.getElementById('adminQuestsList');
        
        list.innerHTML = quests.map(quest => `
            <div class="admin-list-item">
                <div class="admin-list-item-info">
                    <h4>${quest.emoji} ${quest.name}</h4>
                    <p>${quest.description}</p>
                    <p>Recompensa: ${quest.reward} ouro | ${quest.expReward} EXP | Raridade: <span style="color: var(--border-color)">${quest.rarity}</span></p>
                </div>
                <div class="admin-list-item-actions">
                    <button class="btn-admin" onclick="adminPanel.editQuest(${quest.id})">Editar</button>
                    <button class="btn-admin danger" onclick="adminPanel.deleteQuest(${quest.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    editUser(userId) {
        alert('Funcionalidade de edição em desenvolvimento!');
    }

    deleteUser(userId) {
        if (confirm('Tem certeza que deseja deletar este usuário?')) {
            authManager.users = authManager.users.filter(u => u.id !== userId);
            authManager.saveUsers();
            this.loadUsersList();
        }
    }

    editItem(itemId) {
        alert('Funcionalidade de edição em desenvolvimento!');
    }

    deleteItem(itemId) {
        if (confirm('Tem certeza que deseja deletar este item?')) {
            itemManager.items = itemManager.items.filter(i => i.id !== itemId);
            this.loadItemsList();
        }
    }

    editMonster(monsterId) {
        alert('Funcionalidade de edição em desenvolvimento!');
    }

    deleteMonster(monsterId) {
        if (confirm('Tem certeza que deseja deletar este monstro?')) {
            enemyManager.enemies = enemyManager.enemies.filter(e => e.id !== monsterId);
            this.loadMonstersList();
        }
    }

    editQuest(questId) {
        alert('Funcionalidade de edição em desenvolvimento!');
    }

    deleteQuest(questId) {
        if (confirm('Tem certeza que deseja deletar esta quest?')) {
            guildQuestBoard.questManager.quests = guildQuestBoard.questManager.quests.filter(q => q.id !== questId);
            this.loadQuestsList();
        }
    }

    showAddItemForm() {
        alert('Formulário de adicionar item em desenvolvimento!');
    }

    showAddMonsterForm() {
        alert('Formulário de adicionar monstro em desenvolvimento!');
    }

    showAddQuestForm() {
        alert('Formulário de adicionar quest em desenvolvimento!');
    }
}

const adminPanel = new AdminPanel();
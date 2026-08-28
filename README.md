# 🐉 DRAGONS AWAKENING - RPG 3D Completo

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Descrição

**Dragons Awakening** é um RPG 3D completo em HTML5, JavaScript e Three.js com:

✨ **Características Principais:**
- 🔐 Sistema de autenticação com login e registro
- 👤 3 classes jogáveis: Aventureiro, Mago, Paladino
- 🎮 Ambiente 3D totalmente exploável com câmera rotável
- ⚔️ Sistema de combate turn-based contra inimigos variados
- 🎯 Sistema de quests e missões da guilda
- 🎒 Inventário com itens lendários
- 👑 Painel de admin exclusivo para o primeiro usuário
- 💰 Sistema de ouro, experiência e níveis
- 🏰 Múltiplos cenários: Aldeia, Montanhas, Torres, Dungeons
- ✨ Efeitos visuais e partículas 3D

## 🚀 Como Usar

### 1. **Login Inicial**
- **Usuário Admin (Padrão):**
  - Username: `admin`
  - Password: `admin123`

### 2. **Criar Nova Conta**
- Clique em "Cadastro"
- Escolha um nome único para seu guerreiro
- Crie uma senha forte (mínimo 6 caracteres)
- O primeiro usuário criado é automaticamente admin

### 3. **Seleção de Classe**
Após fazer login, escolha sua classe:

#### ⚔️ **Aventureiro**
- HP: 150 | ATK: 20 | DEF: 15
- Versátil e balanceado
- Bom para iniciantes

#### 🔮 **Mago**
- HP: 100 | ATK: 30 | MANA: 100
- Grande poder mágico
- Bom ataque, defesa baixa

#### ✨ **Paladino**
- HP: 180 | ATK: 15 | DEF: 25
- Defensor com habilidades de cura
- Melhor resistência

## 🎮 Mecânicas de Jogo

### Sistema de Combate
1. Encontre inimigos no mapa 3D
2. Clique para iniciar combate
3. Escolha atacar com arma ou usar habilidades
4. Derrote o inimigo para ganhar EXP e itens
5. Complete quests para mais recompensas

### Sistema de Quests
- 📜 Aceite quests na Guilda
- 🎯 Tipos: Matar inimigos, Coletar itens, Explorar
- 💎 Receba recompensas em ouro e experiência
- ⭐ Quests diárias se regeneram

### Equipamento e Itens
- 🗡️ **Armas Lendárias**: Excalibur, Báculo Arcano, Dragão Furor
- 🛡️ **Armaduras**: Dragão, Fênix
- 💊 **Consumíveis**: Poções, Elixires, Cristais de Mana

## 🗺️ Mapa do Mundo

```
        ⛰️ Montanhas
         /    \
    🏰 Torre   🐉 Covil Dragon
        |       |
    🏛️ Templo  Portais
        |       |
    🏘️ Aldeia (Centro)
        |
    🌲 Floresta
```

## 👑 Painel de Administrador

O primeiro usuário criado é Admin e tem acesso ao painel com:

### 📊 Gerenciar Usuários
- Ver todos os usuários registrados
- Editar stats e itens
- Deletar contas

### ⚔️ Gerenciar Inimigos
- Adicionar novos monstros
- Editar dificuldade
- Gerenciar drops de loot

### 🎁 Gerenciar Itens
- Criar itens lendários
- Definir raridade
- Configurar bônus

### 📜 Gerenciar Quests
- Criar novas missões
- Definir recompensas
- Gerenciar objetivos

## 🎨 Controles

| Controle | Ação |
|----------|------|
| Mouse | Rotacionar câmera 3D |
| Scroll | Zoom in/out |
| ESC | Menu pausa |
| Click | Interagir com NPCs |
| 1-3 | Usar habilidades |

## 📁 Estrutura do Projeto

```
rpg-3d-dragoes/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos premium com neon
├── js/
│   ├── auth.js         # Sistema de autenticação
│   ├── game.js         # Gerenciador principal
│   ├── scene3d.js      # Motor 3D com Three.js
│   ├── character.js    # Classes e personagens
│   ├── combat.js       # Sistema de combate
│   ├── quests.js       # Sistema de quests
│   ├── admin.js        # Painel administrativo
│   └── ui.js           # Interface do usuário
└── README.md           # Esta documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilos com gradientes e animações
- **JavaScript (ES6+)** - Lógica do jogo
- **Three.js** - Motor 3D
- **LocalStorage** - Persistência de dados

## 🎯 Objetivos de Jogo

### ⭐ Campanha Principal
1. Derrote os Goblins (Nível 1)
2. Enfrente os Orcs (Nível 3-5)
3. Investigue a Torre Sombria (Nível 10)
4. Derrote o Dragão Antigo (Nível 20) 🏆

### 📊 Progressão
- Ganhe EXP em combates
- Suba de nível para aumentar stats
- Colete itens lendários
- Desbloqueie novas habilidades

## 🐉 Inimigos

| Nome | Level | HP | EXP | Loot |
|------|-------|-----|-----|------|
| Goblin | 1 | 20 | 50 | Poção |
| Lobo Sombrio | 2 | 30 | 75 | Poção |
| Orc Guerreiro | 3 | 50 | 100 | Poção, Elixir |
| Espectro | 5 | 40 | 150 | Poção |
| Mago Negro | 10 | 100 | 800 | Báculo, Mana Crystal |
| Demônio | 15 | 300 | 3000 | Arma, Elixir |
| Dragão Antigo | 20 | 500 | 5000 | Excalibur, Armadura |

## 💡 Dicas de Jogo

1. **Comece pelo Aventureiro** - Classe mais fácil para iniciantes
2. **Faça Quests Diárias** - Ganhe ouro e experiência consistentemente
3. **Colete Itens** - Venda itens duplicados para mais ouro
4. **Upgrade Equipamento** - Itens lendários aumentam seus stats drasticamente
5. **Gerencie Mana** - Não gaste tudo em combate, você pode precisar curar

## 🔐 Sistema de Contas

### Segurança
- Senhas armazenadas localmente (considere hash em produção)
- Cada usuário tem dados únicos
- Admin pode gerenciar todas as contas

### Dados Salvos
- Nível e experiência
- Ouro e itens
- Habilidades aprendidas
- Quests completadas

## 🎵 Atmosfera

O jogo apresenta:
- 🎨 Design dark fantasy com neon
- ✨ Efeitos de partículas em magia
- 🌟 Portais brilhantes para dungeons
- 🏰 Arquitetura medieval em 3D
- 🌙 Céu estrelado

## 🚀 Expansões Futuras

- [ ] Modo multiplayer
- [ ] Sistema de Guildas
- [ ] PvP Arena
- [ ] Mais classes
- [ ] História cinematográfica
- [ ] Sistema de pets
- [ ] Crafting de itens
- [ ] Raids cooperativas

## 📝 Notas de Desenvolvimento

### Versão 1.0.0
- ✅ Sistema de autenticação completo
- ✅ 3D engine com Three.js
- ✅ Sistema de combate funcional
- ✅ Quests e missões
- ✅ Painel de admin
- ✅ UI responsiva

### Próximas Melhorias
- [ ] Suporte a mobile
- [ ] Melhor performance em baixas especificações
- [ ] Mais animações
- [ ] Sistema de chat

## 🤝 Contribuições

Sinta-se livre para abrir issues ou fazer pull requests!

## 📜 Licença

Este projeto está sob a licença MIT.

---

## 🎮 Comece a Jogar!

1. Abra `index.html` no navegador
2. Crie sua conta (ou use admin/admin123)
3. Escolha sua classe
4. Explore o reino e comece sua aventura!

**Bem-vindo ao Reino do Eskai! Que sua jornada seja lendária! ⚔️✨**

---

*Dragon Awakening © 2024 - Desenvolvido com ❤️ e muita magia*

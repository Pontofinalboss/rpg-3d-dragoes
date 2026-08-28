/* ==================== ARQUIVO DE CONFIGURAÇÃO ==================== */

const CONFIG = {
    // Configurações de Jogo
    GAME: {
        MAX_LEVEL: 100,
        MAX_GOLD: 999999,
        AUTO_SAVE_INTERVAL: 5000, // 5 segundos
        DIFFICULTY: 'normal' // easy, normal, hard
    },

    // Configurações de Combate
    COMBAT: {
        TURN_DURATION: 2000, // ms
        DAMAGE_VARIATION: 0.3, // ±30%
        EXP_MULTIPLIER: 1.0,
        GOLD_MULTIPLIER: 1.0,
        CRITICAL_CHANCE: 0.15, // 15%
        CRITICAL_MULTIPLIER: 1.5 // 150% do dano
    },

    // Configurações de Classe
    CLASSES: {
        aventureiro: {
            name: 'Aventureiro',
            emoji: '⚔️',
            description: 'Guerreiro versátil com equilíbrio entre força e resistência',
            stats: {
                hp: 150,
                maxHp: 150,
                mana: 30,
                maxMana: 30,
                atk: 20,
                def: 15,
                atkSpd: 1.2
            },
            color: 0xff6b35
        },
        mago: {
            name: 'Mago',
            emoji: '🔮',
            description: 'Mestre das magias com grande poder ofensivo',
            stats: {
                hp: 100,
                maxHp: 100,
                mana: 100,
                maxMana: 100,
                atk: 30,
                def: 5,
                atkSpd: 0.8
            },
            color: 0x0066ff
        },
        paladino: {
            name: 'Paladino',
            emoji: '✨',
            description: 'Defensor sagrado com habilidades de cura',
            stats: {
                hp: 180,
                maxHp: 180,
                mana: 60,
                maxMana: 60,
                atk: 15,
                def: 25,
                atkSpd: 1
            },
            color: 0xffd700
        }
    },

    // Configurações de Raridade
    RARITIES: {
        common: { name: 'Comum', color: '#ffffff', multiplier: 1 },
        uncommon: { name: 'Incomum', color: '#00ff41', multiplier: 1.2 },
        rare: { name: 'Raro', color: '#0066ff', multiplier: 1.5 },
        epic: { name: 'Épico', color: '#d946ef', multiplier: 2 },
        legendary: { name: 'Lendário', color: '#ffd700', multiplier: 3 }
    },

    // Configurações 3D
    SCENE_3D: {
        FOG_NEAR: 500,
        FOG_FAR: 1000,
        CAMERA_MIN_DISTANCE: 30,
        CAMERA_MAX_DISTANCE: 200,
        GRID_SIZE: 500,
        GRID_DIVISIONS: 50,
        PARTICLE_COUNT: 100,
        STAR_COUNT: 1000
    },

    // Configurações de UI
    UI: {
        HUD_UPDATE_INTERVAL: 100,
        COMBAT_LOG_MAX_ENTRIES: 50,
        NOTIFICATION_DURATION: 3000
    },

    // Dificuldades
    DIFFICULTIES: {
        easy: { enemyHealthMultiplier: 0.7, expMultiplier: 1.2 },
        normal: { enemyHealthMultiplier: 1.0, expMultiplier: 1.0 },
        hard: { enemyHealthMultiplier: 1.5, expMultiplier: 0.8 }
    }
};

// Validar configurações
Object.freeze(CONFIG);
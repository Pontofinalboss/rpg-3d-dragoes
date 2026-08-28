/* ==================== SISTEMA DE LOJA/MARKETPLACE ==================== */

class Marketplace {
    constructor() {
        this.shopItems = this.loadShopItems();
    }

    loadShopItems() {
        return [
            {
                id: 1,
                name: 'Poção de Vida',
                price: 50,
                emoji: '🧪',
                type: 'consumable',
                effect: { heal: 50 },
                stock: 999
            },
            {
                id: 2,
                name: 'Elixir de Mana',
                price: 75,
                emoji: '💙',
                type: 'consumable',
                effect: { mana: 100 },
                stock: 999
            },
            {
                id: 3,
                name: 'Poção de Força',
                price: 100,
                emoji: '💪',
                type: 'consumable',
                effect: { atkBoost: 20, duration: 300 },
                stock: 100
            },
            {
                id: 4,
                name: 'Espada de Ferro',
                price: 500,
                emoji: '🗡️',
                type: 'weapon',
                bonus: 10,
                stock: 50
            },
            {
                id: 5,
                name: 'Armadura de Couro',
                price: 300,
                emoji: '🛡️',
                type: 'armor',
                bonus: 8,
                stock: 50
            },
            {
                id: 6,
                name: 'Anel de Sabedoria',
                price: 800,
                emoji: '💎',
                type: 'accessory',
                bonus: 15,
                stock: 20
            }
        ];
    }

    buyItem(character, itemId, quantity = 1) {
        const item = this.shopItems.find(i => i.id === itemId);
        if (!item) return { success: false, message: 'Item não encontrado' };

        const totalPrice = item.price * quantity;
        if (character.gold < totalPrice) {
            return { success: false, message: 'Ouro insuficiente' };
        }

        if (item.stock < quantity) {
            return { success: false, message: 'Estoque insuficiente' };
        }

        character.gold -= totalPrice;
        character.addItem({ ...item, quantity });
        item.stock -= quantity;

        return { success: true, message: `Você comprou ${quantity}x ${item.name}` };
    }

    sellItem(character, itemId, quantity = 1) {
        const item = character.inventory.find(i => i.id === itemId);
        if (!item) return { success: false, message: 'Item não encontrado no inventário' };

        const sellPrice = Math.floor(item.price * 0.7 * quantity);
        character.gold += sellPrice;
        character.removeItem(itemId);

        return { success: true, message: `Você vendeu ${quantity}x ${item.name} por ${sellPrice} ouro` };
    }
}

const marketplace = new Marketplace();
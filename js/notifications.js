/* ==================== SISTEMA DE NOTIFICAÇÕES ==================== */

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            max-width: 400px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        this.container = container;
    }

    show(message, type = 'info', duration = 3000) {
        const id = Date.now();
        const notif = document.createElement('div');
        notif.id = `notif-${id}`;
        notif.style.cssText = `
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(15, 52, 96, 0.95) 100%);
            border: 2px solid ${this.getColorByType(type)};
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: 10px;
            color: #e0e0e0;
            font-weight: 600;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
            animation: slideIn 0.3s ease-out;
            pointer-events: all;
        `;
        notif.textContent = message;
        this.container.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notif.remove(), 300);
        }, duration);
    }

    getColorByType(type) {
        const colors = {
            info: '#0066ff',
            success: '#00ff41',
            warning: '#ff8c00',
            error: '#ff0041'
        };
        return colors[type] || colors.info;
    }
}

const notificationSystem = new NotificationSystem();

// Adicionar estilos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);
const ChatBot = {
    init: function () {
        this.injectStyles();
        this.createWidget();
        this.bindEvents();
    },

    injectStyles: function () {
        const style = document.createElement('style');
        style.innerHTML = `
            .chatbot-toggler {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: var(--accent-gold, #d4af37);
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 20px rgba(0,0,0,0.4);
                transition: transform 0.3s;
                z-index: 9999;
            }
            .chatbot-toggler:hover {
                transform: scale(1.1);
            }
            .chatbot-toggler i {
                font-size: 24px;
                color: #000;
            }
            
            .chatbot-window {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 350px;
                height: 450px;
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                display: none;
                flex-direction: column;
                z-index: 9999;
                overflow: hidden;
                font-family: 'Inter', sans-serif;
            }
            .chatbot-window.active {
                display: flex;
                animation: slideUp 0.3s ease;
            }
            
            .chat-header {
                background: var(--accent-gold, #d4af37);
                padding: 15px;
                color: #000;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #121212;
            }
            
            .message {
                margin-bottom: 15px;
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 10px;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            .message.bot {
                background: #333;
                color: #fff;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            .message.user {
                background: var(--accent-gold, #d4af37);
                color: #000;
                align-self: flex-end;
                margin-left: auto;
                border-bottom-right-radius: 2px;
            }
            
            .chat-options {
                padding: 15px;
                border-top: 1px solid #333;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .chat-btn {
                background: transparent;
                border: 1px solid var(--accent-gold, #d4af37);
                color: var(--accent-gold, #d4af37);
                padding: 8px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: 0.2s;
            }
            .chat-btn:hover {
                background: var(--accent-gold, #d4af37);
                color: #000;
            }

            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    },

    createWidget: function () {
        // Toggler
        const toggler = document.createElement('div');
        toggler.className = 'chatbot-toggler';
        toggler.innerHTML = '<i class="fas fa-robot"></i>';
        toggler.onclick = () => this.toggleChat();

        // Window
        const window = document.createElement('div');
        window.className = 'chatbot-window';
        window.innerHTML = `
            <div class="chat-header">
                <span>LuxeBot Assistant</span>
                <i class="fas fa-times" onclick="ChatBot.toggleChat()" style="cursor:pointer;"></i>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    Hello! I'm your AI assistant. How can I help you explore LuxeTime today?
                </div>
            </div>
            <div class="chat-options">
                <button class="chat-btn" onclick="ChatBot.ask('features')">Website Features</button>
                <button class="chat-btn" onclick="ChatBot.ask('order')">How to Order</button>
                <button class="chat-btn" onclick="ChatBot.ask('support')">Support</button>
            </div>
        `;

        document.body.appendChild(toggler);
        document.body.appendChild(window);
    },

    toggleChat: function () {
        const win = document.querySelector('.chatbot-window');
        win.classList.toggle('active');
    },

    ask: function (topic) {
        let userText = "";
        let botText = "";

        switch (topic) {
            case 'features':
                userText = "Tell me about the features";
                botText = "LuxeTime features include:<br>• <b>Premium UI:</b> Glassmorphism & Gold animations.<br>• <b>Live Cart:</b> Real-time shopping cart.<br>• <b>Admin Inbox:</b> Developers see orders instantly in the Admin Portal.<br>• <b>PDF Receipts:</b> Download order confirmation PDFs.";
                break;
            case 'order':
                userText = "How do I place an order?";
                botText = "It's easy! Follow these steps:<br>1. Go to <b>Collection</b>.<br>2. Click <b>Add to Cart</b> on a watch.<br>3. Open the <b>Cart</b> (top right) and proceed to Checkout.<br>4. Fill details and click <b>Place Order</b> to receive your receipt!";
                break;
            case 'support':
                userText = "Contact Support";
                botText = "You can contact our developer team via the <a href='contact.html' style='color:#d4af37'>Contact Page</a> or email us directly at support@luxetime.com.";
                break;
        }

        this.addMessage(userText, 'user');
        setTimeout(() => this.addMessage(botText, 'bot'), 500);
    },

    addMessage: function (text, sender) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ChatBot.init();
});

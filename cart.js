// Cart Logic
const Cart = {
    key: 'luxware_cart',

    getCart: function () {
        const cart = localStorage.getItem(this.key);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart: function (cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateCartCount();
    },

    addToCart: function (productId) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === productId);
        const product = products.find(p => p.id === productId);

        if (!product) return;

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart(cart);
        alert(`${product.name} added to cart!`);
    },

    removeFromCart: function (productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCart(cart);
        this.renderCartPage();
    },

    updateQuantity: function (productId, change) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === productId);

        if (item) {
            item.quantity += change;
            if (item.quantity < 1) item.quantity = 1;
            this.saveCart(cart);
            this.renderCartPage();
        }
    },

    updateCartCount: function () {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.innerText = count;
        }
    },

    calculateTotal: function () {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    renderCartPage: function () {
        const container = document.getElementById('cart-items-container');
        const emptyMsg = document.getElementById('empty-cart-msg');
        const cartTable = document.getElementById('cart-table');
        const summarySection = document.querySelector('.cart-summary');

        if (!container) return; // Not on cart page

        const cart = this.getCart();

        if (cart.length === 0) {
            if (cartTable) cartTable.style.display = 'none';
            if (summarySection) summarySection.style.display = 'none';
            if (emptyMsg) emptyMsg.style.display = 'block';
            return;
        }

        if (cartTable) cartTable.style.display = 'table';
        if (summarySection) summarySection.style.display = 'block';
        if (emptyMsg) emptyMsg.style.display = 'none';

        container.innerHTML = cart.map(item => `
            <tr>
                <td>
                    <div class="product-col">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4>${item.name}</h4>
                            <p class="remove-link" onclick="Cart.removeFromCart(${item.id})" style="cursor:pointer; color:red; font-size:0.8rem;">Remove</p>
                        </div>
                    </div>
                </td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <div class="qty-control">
                        <button onclick="Cart.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="Cart.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
            </tr>
        `).join('');

        // Update Summary
        const subtotal = this.calculateTotal();
        const tax = subtotal * 0.05; // 5% tax estimate
        const total = subtotal + tax;

        document.getElementById('summary-subtotal').innerText = formatCurrency(subtotal);
        document.getElementById('summary-tax').innerText = formatCurrency(tax);
        document.getElementById('summary-total').innerText = formatCurrency(total);
    }
};

// Initialize count on load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCartCount();
    Cart.renderCartPage();
});

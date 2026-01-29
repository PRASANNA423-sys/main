// Checkout Logic
document.addEventListener('DOMContentLoaded', () => {

    // Populate Order Summary
    const cart = Cart.getCart();
    const orderSummaryContainer = document.querySelector('.order-summary');
    const existingItems = orderSummaryContainer.querySelectorAll('.order-item');
    existingItems.forEach(el => el.remove()); // Remove hardcoded

    // Insert dynamic items before the summary rows
    const summaryRows = orderSummaryContainer.querySelector('div[style*="margin-top: 20px"]');

    // Wrapper for items
    const itemsWrapper = document.createElement('div');
    itemsWrapper.className = 'checkout-items-list';

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
             <img src="${item.image}" alt="${item.name}">
             <div class="item-details">
                 <h4>${item.name}</h4>
                 <span>Qty: ${item.quantity}</span>
             </div>
             <span>${formatCurrency(item.price * item.quantity)}</span>
        `;
        itemsWrapper.appendChild(div);
    });

    orderSummaryContainer.insertBefore(itemsWrapper, summaryRows);

    // Update Totals
    const subtotal = Cart.calculateTotal();
    const total = subtotal * 1.05; // 5% tax

    const summaryRowsDiv = orderSummaryContainer.querySelector('div[style*="margin-top: 20px"]');
    if (summaryRowsDiv) {
        summaryRowsDiv.innerHTML = `
            <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Subtotal</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
             <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Tax (5%)</span>
                <span>${formatCurrency(subtotal * 0.05)}</span>
            </div>
            <div class="summary-row" style="display:flex; justify-content:space-between; margin-bottom:10px; font-weight:700; color:var(--accent-gold); font-size:1.2rem;">
                <span>Total</span>
                <span>${formatCurrency(total)}</span>
            </div>
        `;
    }

    // Handle Form Submit
    // Handle Form Submit
    const form = document.querySelector('.checkout-layout');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        // Prepare Order Content
        const orderItemsText = cart.map(i => `- ${i.name} (x${i.quantity}): ${formatCurrency(i.price * i.quantity)}`).join('\n');
        const orderTotalText = formatCurrency(total);

        const emailBody = `
New Order Received!
--------------------------------
Customer: ${fname} ${lname}
Email: ${email}
Address: ${address}

Order Details:
${orderItemsText}
--------------------------------
Total: ${orderTotalText}
        `;

        // 1. Try EmailJS (Requires valid keys in placeholders below)
        const SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key

        const templateParams = {
            to_name: "LuxeTime Owner",
            from_name: `${fname} ${lname}`,
            message: emailBody,
            reply_to: email
        };

        const btn = document.querySelector('.place-order-btn');
        btn.innerText = 'Processing...';
        btn.disabled = true;

        // Helper to handle success/redirect
        const finishOrder = () => {
            // --- NEW: Save to Admin Inbox (Simulation) ---
            const orders = JSON.parse(localStorage.getItem('luxware_orders') || '[]');
            orders.push({
                id: Date.now(),
                date: new Date().toISOString(),
                customerName: `${fname} ${lname}`,
                email: email,
                total: formatCurrency(total),
                messageBody: emailBody
            });
            localStorage.setItem('luxware_orders', JSON.stringify(orders));
            // ---------------------------------------------

            // Keep cart for order-success.html rendering
            window.location.href = 'order-success.html';
        };

        // Fallback function
        function sendMailToFallback(bodyText) {
            const subject = encodeURIComponent("New Order - LuxeTime");
            const body = encodeURIComponent(bodyText);
            // Opens the user's default email client addressed to the DEVELOPER
            // Using window.open can sometimes be blocked, location.href is safer for mailto
            window.location.href = `mailto:developer@luxetime.com?subject=${subject}&body=${body}`;
        }

        // Check if configuration is set
        if (window.emailjs && SERVICE_ID !== 'YOUR_SERVICE_ID') {
            emailjs.init(PUBLIC_KEY);
            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(function () {
                    console.log('EmailJS Success!');
                    finishOrder();
                }, function (error) {
                    console.warn('EmailJS Failed:', error);
                    // Fallback to mailto
                    sendMailToFallback(emailBody);
                    // Give a moment for mail client to open before redirecting
                    setTimeout(finishOrder, 1500);
                });
        } else {
            // Keys not set, use MailTo fallback immediately
            console.log("EmailJS keys not set. Using mailto fallback.");
            sendMailToFallback(emailBody);
            setTimeout(finishOrder, 1500);
        }

    });
});

// Main Interactions
document.addEventListener('DOMContentLoaded', () => {

    // Render Featured Products on Home Page
    const featuredContainer = document.getElementById('featured-products-container');
    if (featuredContainer) {
        // Render first 4 items as featured
        renderProductGrid(products.slice(0, 4), featuredContainer);
    }

    // Render All Products on Products Page
    const allProductsContainer = document.getElementById('all-products-container');
    if (allProductsContainer) {
        renderProductGrid(products, allProductsContainer);
    }

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle-label');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Simple logic for the checkbox hack if utilizing that, otherwise toggle class
        });
    }

});

function renderProductGrid(items, container) {
    container.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">
                    ${getStarRating(product.rating)}
                </div>
                <span class="price">${formatCurrency(product.price)}</span>
                <button class="btn-outline" onclick="Cart.addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

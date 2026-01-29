const products = [
    {
        id: 1,
        name: "The Royal Oak",
        price: 1250.00,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
        category: "Luxury",
        rating: 4.5,
        description: "A masterpiece of engineering and aesthetics, featuring a stainless steel case and a distinctive octagonal bezel."
    },
    {
        id: 2,
        name: "Silver Chronograph",
        price: 895.00,
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80",
        category: "Sport",
        rating: 5,
        description: "Precision timing meets elegant design. This chronograph offers superior functionality with a sleek silver finish."
    },
    {
        id: 3,
        name: "Minimalist Black",
        price: 450.00,
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80",
        category: "Casual",
        rating: 4,
        description: "Understated elegance. A pure black dial and strap make this the perfect accessory for any modern outfit."
    },
    {
        id: 4,
        name: "Gold Edition",
        price: 2500.00,
        image: "Casio-YellowGold-2.webp",
        category: "Luxury",
        rating: 5,
        description: "The ultimate statement of luxury. Plated in 24k gold, this timepiece commands attention wherever you go."
    },
    {
        id: 5,
        name: "Classic Leather",
        price: 350.00,
        image: "leather editions.webp", 
        category: "Casual",
        rating: 4.5,
        description: "Timeless style with a genuine leather strap and a clean, readable dial."
    },
     {
        id: 6,
        name: "Diver Pro",
        price: 600.00,
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=600&q=80", 
        category: "Sport",
        rating: 4.8,
        description: "Water-resistant up to 300m. Built for durability and readability in the harshest conditions."
    }
];

// Helper to format currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

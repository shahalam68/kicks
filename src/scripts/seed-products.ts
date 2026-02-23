
const API_URL = 'https://api.escuelajs.co/api/v1/products';
const SHOES_CATEGORY_ID = 4;

const productsToSeed = [
    {
        title: "Nike Air Max 270",
        price: 150,
        description: "The Nike Air Max 270 features Nike's first lifestyle Air unit, designed for comfort and style.",
        categoryId: SHOES_CATEGORY_ID,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1512374382149-433a42b2a636?auto=format&fit=crop&q=80&w=800"
        ]
    },
    {
        title: "Adidas Ultraboost Light",
        price: 180,
        description: "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.",
        categoryId: SHOES_CATEGORY_ID,
        images: [
            "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800"
        ]
    },
    {
        title: "Puma RS-X3",
        price: 110,
        description: "X marks extreme. Exaggerated. Remixed. The RS-X3 takes things to a new level.",
        categoryId: SHOES_CATEGORY_ID,
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800"
        ]
    },
    {
        title: "New Balance 574",
        price: 90,
        description: "The most New Balance shoe ever. The 574 was built to be a reliable shoe that could do a lot of different things well.",
        categoryId: SHOES_CATEGORY_ID,
        images: [
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1552345386-24027c6a917a?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1575537363914-645803fe7550?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1514989940723-e490533597c5?auto=format&fit=crop&q=80&w=800"
        ]
    }
];

async function seed() {
    console.log("Starting seeding process...");
    for (const product of productsToSeed) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Successfully seeded: ${data.title}`);
            } else {
                console.error(`Failed to seed ${product.title}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error seeding ${product.title}:`, error);
        }
    }
    console.log("Seeding process completed.");
}

seed();

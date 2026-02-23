
const PRODUCT_ID = 127;
const API_URL = `https://api.escuelajs.co/api/v1/products/${PRODUCT_ID}`;

const updateData = {
    images: [
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800"
    ]
};

async function updateProduct() {
    console.log(`Updating product ${PRODUCT_ID}...`);
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(`Successfully updated: ${data.title}`);
            console.log("Images:", data.images);
        } else {
            console.error(`Failed to update product: ${response.statusText}`);
            const errorData = await response.json();
            console.error(errorData);
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

updateProduct();

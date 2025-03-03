async function viewProduct() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = '';
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" width="100">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>${product.description}</p>
            `;
            productContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function searchProductAPI(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        const product = await response.json();
        const productDetails = document.getElementById('productDetails');
        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="100">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
        `;
    } catch (error) {
        document.getElementById('productDetails').innerHTML = '<p>No product present</p>';
    }
}

// Load products from sessionStorage or initialize an empty array
let products = JSON.parse(sessionStorage.getItem('products')) || [];

// Function to add product
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const productImage = document.getElementById('productImage').value;

    // Generate product ID automatically (simple increment)
    const productId = products.length + 1;

    // Create new product object
    const newProduct = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage
    };

    // Add product to global array
    products.push(newProduct);

    // Save products to localStorage
    sessionStorage.setItem('products', JSON.stringify(products));

    // Clear form
    document.getElementById('productForm').reset();

    // Optionally alert user that the product has been added
    alert('Product added successfully!');
}

// Function to display products
function displayProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    // Loop through products and add them to the table
    if (products.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5">No products available</td>`;
        tableBody.appendChild(row);
    } else {
        products.forEach(product => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            `;

            tableBody.appendChild(row);
        });
    }
}

// Display products when page loads for viewProduct.html
if (window.location.href.includes('viewProduct.html')) {
    displayProducts();
}

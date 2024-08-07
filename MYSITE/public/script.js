document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from AliExpress API
    fetchProducts();

    async function fetchProducts() {
        try {
            const response = await fetch('https://api.aliexpress.com/v2/products?category_id=205006298', {
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY' // Substitua pelo seu token de API
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            displayProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpar a lista de produtos antes de adicionar novos itens
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image_url}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button onclick="purchaseProduct('${product.id}')">Buy Now</button>
            `;
            productList.appendChild(productItem);
        });
    }

    window.purchaseProduct = function(productId) {
        // Implement purchase logic here
        alert(`Product ${productId} purchased!`);

        // Log the purchase to the server
        logPurchase(productId);

        // Optionally, send to a server-side log
        // fetch('/log-purchase', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ productId })
        // });
    };

    function logPurchase(productId) {
        const purchase = {
            productId: productId,
            timestamp: new Date().toISOString()
        };

        // Save to local storage (or send to a server)
        let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.push(purchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));
    }
});

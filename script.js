fetch('http://localhost:8080')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })

        function displayProducts(products) {
            var productListContainer = document.getElementById('productList');
            products.forEach(product => {
                var productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <h3>${product.name}</h3>`;
                productListContainer.appendChild(productItem);
            })
        }   
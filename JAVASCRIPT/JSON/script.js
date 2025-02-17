document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products-container");

    // Fetch data from JSON server
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                // Create a product card
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                // Ensure price is a valid number before using .toFixed(2)
                const formattedPrice = typeof product.price === "number" ? product.price.toFixed(2) : "N/A";

                // Populate product details
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p><strong>Id:</strong> ${product.id}</p>
                    <p><strong>Category:</strong> ${product.category}</p>  
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Price:</strong> $${formattedPrice}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                `;

                // Append to the container
                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});

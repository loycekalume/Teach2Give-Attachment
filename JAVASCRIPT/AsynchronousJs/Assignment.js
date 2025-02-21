let booksData = [];
let cart = [];

async function fetchBooks() {
    try {
        const response = await fetch("http://localhost:3000/books");
        booksData = await response.json();
        displayBooks(booksData);  // Display books initially
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
}

// Function to display books based on filter
function displayBooks(filteredBooks) {
    const bookDetails = document.getElementById("bookDetails");
    bookDetails.innerHTML = filteredBooks.map((book, index) => {
        return `
            <div class="book">
                <h2>${book.title}</h2>
                <img src="${book.image}" >
                <p id="warningMsg">${book.pages > 500 ? "Warning: This book has over 500 pages" : ""}</p>
                <p><strong>ID:</strong> ${book.id}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Description:</strong> ${book.description}</p> 
                <p><strong>Price:</strong> $${book.price}</p> 
                <button class="buy" onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
    }).join('');
}

// Filter function
function filterBooks() {
    const selectedGenre = document.getElementById("filterDropdown").value;
    if (selectedGenre === "all") {
        displayBooks(booksData);  // Show all books
    } else {
        const filtered = booksData.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
        displayBooks(filtered);
    }
}

// Add book to cart
function addToCart(index) {
    cart.push(booksData[index]);
    updateCart();
}

// Remove book from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    let cartItem = document.getElementById("cartItem");
    let cartCount = document.getElementById("cartCount");
    let totalAmount = document.getElementById("total");

    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItem.innerHTML = "Your cart is empty";
        totalAmount.innerText = "$0.00";
    } else {
        let total = 0;
        cartItem.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `
                <div class="cart-item">
                    <div class="row-img">
                        <img class="rowimg" src="${item.image}">
                    </div>
                    <p style="font-size:12px;">${item.title}</p>
                    <h2 style="font-size: 15px;">$ ${item.price}.00</h2>
                    <button class="remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        }).join('');
        totalAmount.innerText = `$${total}.00`;
    }
}

// Modal functionality
var modal = document.getElementById("myModal");
var btn = document.getElementById("cartButton");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Event listener for filter dropdown
document.getElementById("filterDropdown").addEventListener("change", filterBooks);

// Load books on page load
document.addEventListener("DOMContentLoaded", fetchBooks);

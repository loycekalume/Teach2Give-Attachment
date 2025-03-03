var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
// **Global Variables**
let booksData = []; // Stores all books fetched from the API
let cart = []; // Stores books added to the cart
// Function to fetch books from JSON server
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/books"); // Fetch data from server
            booksData = yield response.json(); // Convert response to JSON
            displayBooks(booksData); // Display books initially
        }
        catch (error) {
            console.error("Error Fetching Data:", error);
        }
    });
}
// **Function to display books based on filter**
function displayBooks(filteredBooks) {
    const bookDetails = document.getElementById("bookDetails");
    if (bookDetails) {
        bookDetails.innerHTML = filteredBooks
            .map((book, index) => `
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
                    <button class="buy" data-index="${index}">Add to Cart</button>
                </div>
            `)
            .join("");
        // Attach event listeners to buttons
        document.querySelectorAll(".buy").forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target;
                const bookIndex = parseInt(target.getAttribute("data-index"), 10);
                addToCart(bookIndex);
            });
        });
    }
}
// **Function to filter books by genre**
function filterBooks() {
    const filterDropdown = document.getElementById("filterDropdown");
    const selectedGenre = filterDropdown.value;
    if (selectedGenre === "all") {
        displayBooks(booksData); // Show all books if "all" is selected
    }
    else {
        const filtered = booksData.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
        displayBooks(filtered);
    }
}
// **Function to add book to cart**
function addToCart(index) {
    cart.push(booksData[index]);
    updateCart();
}
// **Function to remove book from cart**
function removeFromCart(index) {
    cart.splice(index, 1); // Removes item from cart
    updateCart();
}
// **Function to update cart display**
function updateCart() {
    const cartItem = document.getElementById("cartItem");
    const cartCount = document.getElementById("cartCount");
    const totalAmount = document.getElementById("total");
    if (cartCount)
        cartCount.innerText = cart.length.toString();
    if (cartItem && totalAmount) {
        if (cart.length === 0) {
            cartItem.innerHTML = "Your cart is empty";
            totalAmount.innerText = "$0.00";
        }
        else {
            let total = 0;
            cartItem.innerHTML = cart
                .map((item, index) => {
                total += item.price;
                return `
                        <div class="cart-item">
                            <div class="row-img">
                                <img class="rowimg" src="${item.image}">
                            </div>
                            <p style="font-size:12px;">${item.title}</p>
                            <h2 style="font-size: 15px;">$ ${item.price}.00</h2>
                            <button class="remove" data-index="${index}">Remove</button>
                        </div>
                    `;
            })
                .join("");
            totalAmount.innerText = `$${total}.00`;
            // Attach event listeners to remove buttons
            document.querySelectorAll(".remove").forEach(button => {
                button.addEventListener("click", (event) => {
                    const target = event.target;
                    const bookIndex = parseInt(target.getAttribute("data-index"), 10);
                    removeFromCart(bookIndex);
                });
            });
        }
    }
}
// **Modal functionality for cart**
const modal = document.getElementById("myModal");
const btn = document.getElementById("cartButton");
const span = document.getElementsByClassName("close")[0];
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
    if (modal)
        modal.style.display = "block";
});
span === null || span === void 0 ? void 0 : span.addEventListener("click", () => {
    if (modal)
        modal.style.display = "none";
});
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
// **Event listener for filter dropdown**
(_a = document.getElementById("filterDropdown")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", filterBooks);
// **Load books on page load**
document.addEventListener("DOMContentLoaded", fetchBooks);
export {};
//# sourceMappingURL=index.js.map
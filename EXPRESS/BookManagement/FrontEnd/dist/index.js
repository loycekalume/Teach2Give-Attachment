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
import { fetchBooks } from "./events";
let cart = []; // Declare cart array to store added books
let booksData = []; // Store fetched books globally
// Function to display books
const displayBooks = (books) => {
    booksData = books; // Store fetched books globally
    const bookDetails = document.getElementById("bookDetails");
    if (!bookDetails)
        return;
    bookDetails.innerHTML = books
        .map((book, index) => `
        <div class="book">
          <h2>${book.title}</h2>
          <img src="${book.image}" alt="Book cover">
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
    // Attach event listeners to 'Add to Cart' buttons
    document.querySelectorAll(".buy").forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const bookIndex = parseInt(target.getAttribute("data-index"), 10);
            addToCart(bookIndex);
        });
    });
};
// Function to add a book to the cart
function addToCart(index) {
    cart.push(booksData[index]);
    updateCart();
}
// Function to remove a book from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
// Function to update cart display
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
            document.querySelectorAll(".remove").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const target = event.target;
                    const bookIndex = parseInt(target.getAttribute("data-index"), 10);
                    removeFromCart(bookIndex);
                });
            });
        }
    }
}
// Modal functionality for cart
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
// Fetch and display books on page load
const loadBooks = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (args = "") {
    const books = yield fetchBooks(args);
    displayBooks(books);
});
// Filter books by genre
const updateBookDisplay = () => __awaiter(void 0, void 0, void 0, function* () {
    const genre = document.getElementById("filterDropdown").value;
    const books = yield fetchBooks(genre); // Fetch filtered books from backend
    displayBooks(books);
});
// Attach event listener
(_a = document.getElementById("filterDropdown")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", updateBookDisplay);
// Load all books initially
updateBookDisplay();
loadBooks();
//# sourceMappingURL=index.js.map
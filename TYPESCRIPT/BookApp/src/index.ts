// Importing Books type from books module
import { Books } from "./books.js";

// **Global Variables**
let booksData: Books[] = []; // Stores all books fetched from the API
let cart: Books[] = []; // Stores books added to the cart

// Function to fetch books from JSON server
async function fetchBooks(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/books"); // Fetch data from server
        booksData = await response.json(); // Convert response to JSON
        displayBooks(booksData); // Display books initially
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
}

// **Function to display books based on filter**
function displayBooks(filteredBooks: Books[]): void {
    const bookDetails = document.getElementById("bookDetails") as HTMLElement | null;
    
    if (bookDetails) {
        bookDetails.innerHTML = filteredBooks
            .map((book: Books, index: number) => `
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
                const target = event.target as HTMLButtonElement;
                const bookIndex = parseInt(target.getAttribute("data-index")!, 10);
                addToCart(bookIndex);
            });
        });
    }
}

// **Function to filter books by genre**
function filterBooks(): void {
    const filterDropdown = document.getElementById("filterDropdown") as HTMLSelectElement;
    const selectedGenre: string = filterDropdown.value;

    if (selectedGenre === "all") {
        displayBooks(booksData); // Show all books if "all" is selected
    } else {
        const filtered = booksData.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
        displayBooks(filtered);
    }
}

// **Function to add book to cart**
function addToCart(index: number): void {
    cart.push(booksData[index]);
    updateCart();
}

// **Function to remove book from cart**
function removeFromCart(index: number): void {
    cart.splice(index, 1); // Removes item from cart
    updateCart();
}

// **Function to update cart display**
function updateCart(): void {
    const cartItem = document.getElementById("cartItem") as HTMLDivElement | null;
    const cartCount = document.getElementById("cartCount") as HTMLSpanElement | null;
    const totalAmount = document.getElementById("total") as HTMLHeadingElement | null;

    if (cartCount) cartCount.innerText = cart.length.toString();
    
    if (cartItem && totalAmount) {
        if (cart.length === 0) {
            cartItem.innerHTML = "Your cart is empty";
            totalAmount.innerText = "$0.00";
        } else {
            let total = 0;
            cartItem.innerHTML = cart
                .map((item: Books, index: number) => {
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
                    const target = event.target as HTMLButtonElement;
                    const bookIndex = parseInt(target.getAttribute("data-index")!, 10);
                    removeFromCart(bookIndex);
                });
            });
        }
    }
}

// **Modal functionality for cart**
const modal = document.getElementById("myModal") as HTMLDivElement | null;
const btn = document.getElementById("cartButton") as HTMLButtonElement | null;
const span = document.getElementsByClassName("close")[0] as HTMLElement | null;

btn?.addEventListener("click", () => {
    if (modal) modal.style.display = "block";
});

span?.addEventListener("click", () => {
    if (modal) modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal!.style.display = "none";
    }
});

// **Event listener for filter dropdown**
(document.getElementById("filterDropdown") as HTMLSelectElement)?.addEventListener("change", filterBooks);

// **Load books on page load**
document.addEventListener("DOMContentLoaded", fetchBooks);

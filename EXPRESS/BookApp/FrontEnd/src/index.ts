import { fetchBooks } from "./events";
import { Books } from "./books";

let cart: Books[] = []; // Declare cart array to store added books
let booksData: Books[] = []; // Store fetched books globally

// Function to display books
const displayBooks = (books: Books[]) => {
  booksData = books; // Store fetched books globally
  const bookDetails = document.getElementById("bookDetails");
  if (!bookDetails) return;

  bookDetails.innerHTML = books
    .map(
      (book, index) => `
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
      `
    )
    .join("");

  // Attach event listeners to 'Add to Cart' buttons
  document.querySelectorAll(".buy").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;
      const bookIndex = parseInt(target.getAttribute("data-index")!, 10);
      addToCart(bookIndex);
    });
  });
};

// Function to add a book to the cart
function addToCart(index: number): void {
  cart.push(booksData[index]);
  updateCart();
}

// Function to remove a book from the cart
function removeFromCart(index: number): void {
  cart.splice(index, 1);
  updateCart();
}

// Function to update cart display
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
      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", (event) => {
          const target = event.target as HTMLButtonElement;
          const bookIndex = parseInt(target.getAttribute("data-index")!, 10);
          removeFromCart(bookIndex);
        });
      });
    }
  }
}

// Modal functionality for cart
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

// Fetch and display books on page load
const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  displayBooks(books);
}


// Filter books by genre
const updateBookDisplay = async () => {
  const genre = (document.getElementById("filterDropdown") as HTMLSelectElement).value;
  const books = await fetchBooks(genre); // Fetch filtered books from backend
  displayBooks(books);
};

// Attach event listener
document.getElementById("filterDropdown")?.addEventListener("change", updateBookDisplay);

// Load all books initially
updateBookDisplay();

loadBooks()
  

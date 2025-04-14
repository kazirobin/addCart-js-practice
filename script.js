const cart = [];

// Fetch books from data.json and display them
async function fetchData() {
  const bookContainer = document.getElementById("book_container");

  try {
    const response = await fetch("./data.json");
    const books = await response.json();

    bookContainer.innerHTML = "";

    books.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("ebook");

      bookItem.innerHTML = `
        <p class="title">${book.title}</p>
        <div class="imgs"><img src="${book.src}" alt="${book.title}"></div>
        <p class="price">৳${book.price}</p>
        <button class="cart_btn" data-id="${index}">Add To Cart</button>
      `;

      bookContainer.appendChild(bookItem);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".cart_btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookIndex = this.getAttribute("data-id");
        addToCart(books[bookIndex]);
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.length = 0;
    cart.push(...JSON.parse(savedCart));
    updateCart();
    calculateTotal();
  }
}

// Add book to cart
function addToCart(book) {
  const exists = cart.some((item) => item.id === book.id);

  if (!exists) {
    cart.push(book);
    saveCartToLocalStorage();
    updateCart();
    calculateTotal();
  } else {
    alert("This book is already in the cart!");
  }
}

// Update cart UI
function updateCart() {
  const cartContainer = document.getElementById("cart_container");
  cartContainer.innerHTML = "";

  cart.forEach((cartItem, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("ebook");

    cartItemDiv.innerHTML = `
      <p class="title">${cartItem.title}</p>
      <div class="imgs"><img src="${cartItem.src}" alt="${cartItem.title}"></div>
      <p class="price">৳${cartItem.price}</p>
      <button class="remove_btn" data-id="${index}">Remove</button>
    `;

    cartContainer.appendChild(cartItemDiv);
  });

  // Add event listeners to "Remove" buttons
  document.querySelectorAll(".remove_btn").forEach((button) => {
    button.addEventListener("click", function () {
      const cartIndex = this.getAttribute("data-id");
      removeFromCart(cartIndex);
    });
  });

  calculateTotal();
}

// Remove book from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage();
  updateCart();
  calculateTotal();
}

// Calculate total price
function calculateTotal() {
  const totalPriceElement = document.getElementById("total_price");

  if (!totalPriceElement) {
    console.error("Total price element not found!");
    return;
  }

  let total = cart.reduce((sum, book) => sum + book.price, 0);
  totalPriceElement.textContent = `৳${total.toFixed(2)}`;

  applyDiscount();
}

// Apply discount
function applyDiscount() {
  const discountInput = document.getElementById("discount_input");
  const totalPriceElement = document.getElementById("total_price");
  const finalPriceElement = document.getElementById("final_price");

  if (!totalPriceElement || !finalPriceElement) {
    console.error("Price elements not found!");
    return;
  }

  let total = parseFloat(totalPriceElement.textContent.replace("৳", ""));
  if (isNaN(total)) {
    console.error("Invalid total price:", total);
    return;
  }

  let discount = parseFloat(discountInput.value);
  if (isNaN(discount) || discount < 0 || discount > 100) {
    discount = 0;
  }

  let discountedPrice = total - (total * discount) / 100;
  finalPriceElement.textContent = `৳${discountedPrice.toFixed(2)}`;
}

// Apply discount on button click
document.getElementById("apply_discount").addEventListener("click", applyDiscount);

// Load data on page start
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  loadCartFromLocalStorage();
});




 
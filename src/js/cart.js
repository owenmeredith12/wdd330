import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty</p>';
    document.querySelector('.list-total').innerHTML = ''; // Clear total
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  addRemoveListeners();
  calcSubtotal(); // ✅ Call here to recalculate after rendering
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <div class="cart-card__quantity">
        <button class="decrease-btn" data-index="${index}">-</button>
        <span class="quantity-num">${item.quantity}</span>
        <button class="increase-btn" data-index="${index}">+</button>
      </div>
      <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
      <button class="remove-btn" data-index="${index}">Remove Item</button>
    </li>
  `;
}


function addRemoveListeners() {
  document.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      removeProductFromCart(index);
    });
  });

  document.querySelectorAll('.increase-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      updateQuantity(index, 1);
    });
  });

  document.querySelectorAll('.decrease-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      updateQuantity(index, -1);
    });
  });
}


function removeProductFromCart(index) {
  const cartItems = getLocalStorage('so-cart') || [];

  cartItems.splice(index, 1);

  setLocalStorage('so-cart', cartItems);

  renderCartContents();
}

function updateQuantity(index, change) {
  const cartItems = getLocalStorage('so-cart') || [];

  cartItems[index].quantity = (cartItems[index].quantity || 1) + change;

  // Remove item if quantity is 0 or less
  if (cartItems[index].quantity <= 0) {
    cartItems.splice(index, 1);
  }

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}


function calcSubtotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    console.log(cartItems[i].FinalPrice);
    total += cartItems[i].FinalPrice * (cartItems[i].quantity || 1);
  }
  console.log(total);

  document.querySelector('.list-total').innerHTML = `Total: $${total.toFixed(2)}`;
}

renderCartContents();
calcSubtotal();

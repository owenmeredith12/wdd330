import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
<<<<<<< HEAD
  const cartItems = getLocalStorage('so-cart') || []; //Update cart rendering logic to handle the case when the cart is empty
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
=======
  const cartItems = getLocalStorage('so-cart') || [];
  
  // Check if cart is empty
  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
>>>>>>> om--individual3
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
  // Add event listeners after rendering
  addRemoveListeners();
}

function cartItemTemplate(item, index) {
  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-btn" data-index="${index}">Remove Item</button>
    </li>
  `;
  return newItem;
}

<<<<<<< HEAD
renderCartContents();
=======
function addRemoveListeners() {
  const removeButtons = document.querySelectorAll('.remove-btn');
  
  removeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const index = parseInt(e.target.dataset.index);
      removeProductFromCart(index);
    });
  });
}

function removeProductFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  
  
  cartItems.splice(index, 1);
  

  setLocalStorage("so-cart", cartItems);
  

  renderCartContents();
}


renderCartContents();
>>>>>>> om--individual3

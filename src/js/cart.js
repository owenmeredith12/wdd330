import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  // Check if cart is empty
  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty</p>';
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
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

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll('.remove-btn');

  removeButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const index = parseInt(e.target.dataset.index);
      removeProductFromCart(index);
    });
  });
}

function removeProductFromCart(index) {
  const cartItems = getLocalStorage('so-cart') || [];

  cartItems.splice(index, 1);

  setLocalStorage('so-cart', cartItems);

  renderCartContents();
}

function calcSubtotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    console.log(cartItems[i].FinalPrice);
    total += cartItems[i].FinalPrice;
  }
  console.log(total);

  
}

  function calcOrderTotal(){
    const cartItems = getLocalStorage('so-cart') || [];
    let total = 0; 
    let tax = 0;
    for (let i =0; i < cartItems.length; i++){
        console.log(cartItems[i].FinalPrice);
        total += cartItems[i].FinalPrice;
    }

    total+= total *= .06;
    
    if (cartItems.length > 0){
        tax = 10;
    }
    else if(cartItems.length > 1 ){
        tax = 10;
        tax += ((cartItems.length - 1) *2);
    }
    total += tax;
    console.log(total);
    let formattedTotal = total.toFixed(2);
    document.querySelector('.list-total').innerHTML = `Total: ${formattedTotal}`;
  }

renderCartContents();
calcSubtotal();
calcOrderTotal();

import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  const existingCart = JSON.parse(localStorage.getItem('so-cart')) || [];
  existingCart.push(product); //append product
  setLocalStorage('so-cart', existingCart); //store updated array
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('addToCart')
    .addEventListener('click', addToCartHandler);
});
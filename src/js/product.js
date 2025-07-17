import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

// Set up product data source (no category needed now)
const dataSource = new ProductData();

// Save a product to local storage under the "so-cart" key
function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

// Event handler for "Add to Cart" button
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) return;

  // ✅ Use the updated method to get product by ID
  const product = await dataSource.getProductById(productId);
  addProductToCart(product);
}

// Run setup when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Find all "Add to Cart" buttons on the page
  const buttons = document.querySelectorAll('.add-to-cart-btn');

  // Attach the handler to each button
  buttons.forEach((button) => {
    button.addEventListener('click', addToCartHandler);
  });
});
import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

// Grab product data for 'tents'
const dataSource = new ProductData('tents');

// Save selected product to localStorage
function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

// Handle "Add to Cart" button click
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Render product list to the home page from JSON
function renderProductList(products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = ''; // Clear old content

  products.forEach((product) => {
    const item = document.createElement('li');
    item.classList.add('product-card');
    item.setAttribute('data-id', product.Id);

    item.innerHTML = `
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <button class="quick-view-btn">Quick View</button>
      <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
    `;

    productList.appendChild(item);
  });
}

// Adds event listeners to "Add to Cart" buttons
function setupCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', addToCartHandler);
  });
}

// QUICK LOOKUP MODAL FEATURE
// ===============================================================
// Add "Quick View" functionality
function injectQuickViewButtons() {
  const buttons = document.querySelectorAll('.quick-view-btn');

  buttons.forEach((button) => {
    const id = button.closest('.product-card')?.dataset.id;
    if (!id) return;

    button.addEventListener('click', () => openQuickView(id));
  });
}

// Setup and show the modal
function createModal() {
  // Check if modal already exists
  if (document.querySelector('#quick-view-modal')) return;

  // Create modal structure
  const modal = document.createElement('div');
  modal.id = 'quick-view-modal';
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <div class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal on close button click
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

// Fill modal with product info
async function openQuickView(productId) {
  const product = await dataSource.findProductById(productId);
  if (!product) return;

  const modal = document.querySelector('#quick-view-modal');
  const body = modal.querySelector('.modal-body');

  // Populate modal with product content
  body.innerHTML = `
    <h2>${product.Name}</h2>
    <h3>${product.Brand?.Name}</h3>
    <img src="${product.Image}" alt="${product.Name}" />
    <p>${product.DescriptionHtmlSimple}</p> <!-- Fixed key -->
    <p><strong>Price:</strong> $${product.FinalPrice}</p>
  `;

  // Display the modal
  modal.classList.add('show');
}
// ===============================================================

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  createModal(); // build modal
  dataSource.getData().then((products) => {
    renderProductList(products); // show products
    setupCartButtons(); // enable add to cart
    injectQuickViewButtons(); // enable quick view
  });
});

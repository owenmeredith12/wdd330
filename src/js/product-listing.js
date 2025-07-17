import ProductData from './ProductData.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
loadHeaderFooter();

// ✅ Get category from URL
const category = getParam('category');

// ✅ Create data source
const dataSource = new ProductData(category);

// ✅ Create modal HTML
function createModal() {
  if (document.querySelector('#quick-view-modal')) return;

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

  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

// ✅ Render product cards
function renderProductList(products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  // Update title text
  const title = document.querySelector('.title');
  title.textContent = `Top Products: ${category}`;

  products.forEach((product) => {
    const item = document.createElement('li');
    item.classList.add('product-card');
    item.setAttribute('data-id', product.Id);

    item.innerHTML = `
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images?.PrimaryMedium}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand?.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn">Quick View</button>
      <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
    `;

    productList.appendChild(item);
  });

  injectQuickViewButtons();
}

// ✅ Add event listeners to "Quick View" buttons
function injectQuickViewButtons() {
  const buttons = document.querySelectorAll('.quick-view-btn');

  buttons.forEach((button) => {
    const id = button.closest('.product-card')?.dataset.id;
    if (!id) return;

    button.addEventListener('click', () => openQuickView(id));
  });
}

// ✅ Load product data into modal
async function openQuickView(productId) {
  const product = await dataSource.findProductById(productId);
  if (!product) return;

  const modal = document.querySelector('#quick-view-modal');
  const body = modal.querySelector('.modal-body');

  body.innerHTML = `
    <h2>${product.Name}</h2>
    <h3>${product.Brand?.Name}</h3>
    <img src="${product.Images?.PrimaryLarge}" alt="${product.Name}" />
    <p>${product.DescriptionHtmlSimple}</p>
    <p><strong>Price:</strong> $${product.FinalPrice}</p>
  `;

  modal.classList.add('show');
}

// ✅ Load everything
document.addEventListener('DOMContentLoaded', async () => {
  createModal();

  try {
    const products = await dataSource.getData();
    renderProductList(products);
  } catch (err) {
    console.error('Error fetching product data:', err);
  }
});
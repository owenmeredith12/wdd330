import { renderListWithTemplate } from "./utils.mjs";

// This class handles loading and displaying a list of products
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;       // category of products to fetch
    this.dataSource = dataSource;   // where to get the product data
    this.listElement = listElement; // the element where products will be displayed
  }

  async init() {
    // fetch the product list and render it
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    // render each product using our template and utility function
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

// template for a single product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h2>${product.Name}</h2>
        <p>${product.Description}</p>
        <p>$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}
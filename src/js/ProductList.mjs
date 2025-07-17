import { renderListWithTemplate } from "./utils.mjs";


// Updated the productCardTemplate function to include a "Quick VIew" button
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <img src="${product.Image}" alt="${product.Name}">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
    this.addQuickViewListeners(); // Modified the init method to attach the modal behavior
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

  // Adding a method to handle the Quick View button clicks
  addQuickViewListeners() {
    document.querySelectorAll(".quick-view-btn").forEach(button => {
      button.addEventListener("click", async (e) => {
        const productId = e.target.dataset.id;
        const product = await this.dataSource.findProductById(productId);
        this.showModal(product);
      });
    });
  }

  showModal(product) {
    // Create or find modal
    let modal = document.querySelector("#quickModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "quickModal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>${product.Brand.Name}</h2>
          <h3>${product.NameWithoutBrand}</h3>
          <img src="${product.Image}" alt="${product.NameWithoutBrand}">
          <p class="product-card__price">$${product.FinalPrice}</p>
          <p>${product.Colors?.[0]?.ColorName || ''}</p>
          <p>${product.DescriptionHtmlSimple}</p>
        </div>`;
      modal.classList.add("modal");
      document.body.appendChild(modal);
    } else {
      // update content if modal already exists
      modal.querySelector(".modal-content").innerHTML = `
        <span class="close">&times;</span>
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <img src="${product.Image}" alt="${product.NameWithoutBrand}">
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p>${product.Colors?.[0]?.ColorName || ''}</p>
        <p>${product.DescriptionHtmlSimple}</p>
      `;
    }

    modal.style.display = "block";

    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}


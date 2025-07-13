import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card>
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataS, listE) {
        this.category = category;
        this.dataS = dataSource;
        this.listE = listElement;
    }

    async init() {
        const list = await this.dataS.getData();
        this.renderList(list);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listE.insertAdjacentHTML('afterbegin, htmlStrings.join(''));

        renderListWithTemplate(productCardTemplate, this.listE, list);
    }
}
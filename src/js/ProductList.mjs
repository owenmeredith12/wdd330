import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card>
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3>${product.Brand.Name}</h3>
            <h2>${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector('.title').textContent = this.category;
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listE.insertAdjacentHTML('afterbegin, htmlStrings.join(''));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    discountPrice() {
        if (FinalPrice < SuggestedRetailPrice) {
            alert("This item is discounted.")
        }
    }
}
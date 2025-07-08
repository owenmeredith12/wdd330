export default class ProductList {
    constructor(category, dataS, listE) {
        this.category = category;
        this.dataS = dataSource;
        this.listE = listElement;
    }
    async init() {
        const list = await this.dataS.getData()
    }

    
}

function productCardTemplate(product) {
    return `<li class="product-card>
        <a href="product_pages/?product=">
            <img src="" alt="Image of ">
            <h3 class="card__brand"></h3>
            <h2 class="card__name"></h2>
            <p class="product-card__price">$</p>
        </a>
    </li>`
}
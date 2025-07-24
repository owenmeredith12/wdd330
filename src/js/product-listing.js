import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const element = document.querySelector('.product-list');
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, element);
// finally call the init method to show the products
productList.init();

function discountListing() {
    if (FinalPrice < SuggestedRetailPrice) {
        alert('This product is discounted.')
    }
}

discountListing();
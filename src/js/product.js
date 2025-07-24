import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const productID = getParam('product');
const dataSource = new ExternalServices('tents');

const product = new ProductDetails(productID, dataSource);
product.init();

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);

import ProductData from './ProductData.mjs';
import ProductList from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData('tents');

const element = document.querySelector('.product-list');

const productList = new ProductList('Tents', dataSource, element);

loadHeaderFooter();

productList.init();

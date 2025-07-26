import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

import Alert from './alerts.js';

const alert = new Alert();
alert.showAlerts();

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const element = document.querySelector('.product-list');
const listing = new ProductList(category, dataSource, element);

listing.init();

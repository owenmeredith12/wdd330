import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const element = document.querySelector('.product-list');
const productlist = new ProductList(category, dataSource, element);

let originalList = [];

async function sortedListnit() {
  const list = await dataSource.getData(category);
  originalList = list;
  productlist.renderList(originalList);
  document.querySelector('.title').textContent = category;
}

sortedListnit()

productlist.init();

document.getElementById('sort').addEventListener('change', (e) => {
    let sortedList = [...originalList]; // cópia da lista original
    const value = e.target.value;
  
    if (value === 'name') {
      sortedList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    } else if (value === 'price') {
      sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
  
    productlist.renderList(sortedList);
});
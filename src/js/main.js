import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const listElement = document.querySelector(".product-list");

// create a new ProductData object for the "tents" category
const dataSource = new ProductData("tents");

// create a ProductList instance using the category, data source, and the target HTML element
const myList = new ProductList("tents", dataSource, listElement);

myList.init();

// Import product loader to make sure Vite knows we use all-products.json
import { loadAllProducts } from './loadAllProducts.mjs';

const isLocal = location.hostname === 'localhost';
const baseURL = isLocal
  ? 'http://server-nodejs.cit.byui.edu:3000/'
  : '/json/';

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  async getData(category) {
    if (isLocal) {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } else {
      const allProducts = await loadAllProducts();
      return allProducts.filter(
        (p) => (p.Category || '').toLowerCase() === category.toLowerCase()
      );
    }
  }

  async findProductById(id) {
    if (isLocal) {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } else {
      const allProducts = await loadAllProducts();
      const product = allProducts.find((p) => p.Id === id);
      if (!product) throw new Error(`Product with ID ${id} not found`);
      return product;
    }
  }

  async checkout(payload) {
    if (!isLocal) {
      throw new Error("Checkout is only available in development.");
    }

    const response = await fetch(`${baseURL}checkout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await convertToJson(response);
  }
}

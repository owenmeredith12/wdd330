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
    let data;

    if (isLocal) {
      const response = await fetch(`${baseURL}products/search/${category}`);
      data = await convertToJson(response);
      return data.Result;
    } else {
      const response = await fetch(`${baseURL}all-products.json`);
      const allProducts = await convertToJson(response);
      // Filter by Category, fallback to [] if category missing
      return allProducts.filter(p => (p.Category || '').toLowerCase() === category.toLowerCase());
    }
  }

  async findProductById(id) {
    if (isLocal) {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } else {
      const response = await fetch(`${baseURL}all-products.json`);
      const allProducts = await convertToJson(response);
      const product = allProducts.find(p => p.Id === id);
      if (!product) throw new Error(`Product with ID ${id} not found`);
      return product;
    }
  }

  async checkout(payload) {
    if (!isLocal) {
      throw new Error("Checkout not supported in production (static site).");
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${baseURL}checkout/`, options);
    return await convertToJson(response);
  }
}
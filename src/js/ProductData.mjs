// 1. Get the server base URL from the environment variable
const baseURL = import.meta.env.VITE_SERVER_URL;

// 2. This helper converts the fetch response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  // 3. No constructor needed
  constructor() {
    // No initialization required
  }

  // 4. Get products by category
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // Array of products
  }

  // 5. NEW: Get a single product by ID using direct endpoint
  async getProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data; // Returns single product object directly
  }
}

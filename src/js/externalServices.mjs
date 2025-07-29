const isLocal = location.hostname === 'localhost';
const isNetlify = location.hostname.includes('netlify.app');

// 1. Local development uses the BYUI HTTP API (it works over HTTP)
const localBase = 'http://server-nodejs.cit.byui.edu:3000/';

// 2. Live Netlify deployment uses static JSON files (in public/json/)
const netlifyBase = '/json/';

// Select baseURL at runtime
const baseURL = isLocal ? localBase : netlifyBase;

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
    const url = isLocal
      ? `${baseURL}products/search/${category}`
      : `${baseURL}${category}.json`;
    const response = await fetch(url);
    return await convertToJson(response).then(res => res.Result || res);
  }

async findProductById(id) {
  const url = isLocal
    ? `${localBase}product/${id}`
    : '/json/all-products.json';

  const response = await fetch(url);
  const result = await convertToJson(response);

  if (!isLocal) {
    return result.find((item) => item.Id === id);
  }

  return result.Result;
}

  async checkout(payload) {
    if (!isLocal) throw new Error("Checkout not supported in Netlify mode.");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
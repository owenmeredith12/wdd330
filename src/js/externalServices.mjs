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

function getFileNameForCategory(category) {
  // Map category to its corresponding JSON file
  const map = {
    tents: 'tents.json',
    backpacks: 'backpacks.json',
    'sleeping-bags': 'sleeping-bags.json',
  };
  return map[category.toLowerCase()] || null;
}

export default class ExternalServices {
async getData(category) {
  if (isLocal) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  } else {
    const fileName = getFileNameForCategory(category);
    if (!fileName) throw new Error(`Unknown category: ${category}`);

    const response = await fetch(`${baseURL}${fileName}`);
    const data = await convertToJson(response);

    // Fix missing image paths
    return data.map((product) => {
      if (!product.Images || !product.Images.PrimaryMedium) {
        const imageFileName = `${product.Id.toLowerCase()}.jpg`;
        product.Images = {
          PrimaryMedium: `/images/${category}/${imageFileName}`
        };
      }
      return product;
    });
  }
}

  async findProductById(id) {
    if (isLocal) {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } else {
      // Try loading from all 3 files
      const files = ['tents.json', 'backpacks.json', 'sleeping-bags.json'];
      for (const file of files) {
        const res = await fetch(`${baseURL}${file}`);
        const products = await convertToJson(res);
        const match = products.find((p) => p.Id === id);
        if (match) return match;
      }
      throw new Error(`Product with ID ${id} not found`);
    }
  }

  async checkout(payload) {
    if (!isLocal) {
      throw new Error("Checkout is only available in development.");
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

export async function loadAllProducts() {
  const response = await fetch('/json/all-products.json');
  if (!response.ok) {
    throw new Error(`Failed to load product data: ${response.status}`);
  }
  return await response.json();
}
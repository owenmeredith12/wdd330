import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

// function productTemplate(product) {
//     document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
//     document.getElementById('productBrand').textContent = product.Brand.Name;
//     document.getElementById('productName').textContent = product.NameWithoutBrand;

//   const productImg = document.getElementById('productImage');
//   productImg.src = product.Images.PrimaryExtraLarge;
//   productImg.alt = product.NameWithoutBrand;

// //   document.getElementById('productPrice').textContent = `$${product.FinalPrice}`;
//   // Update final price if there are more item in the cart
  

//   document.getElementById('productColor').textContent = `Color: ${product.Colors[0].ColorName}`;
//   document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
  
//   if (product.FinalPrice < product.SuggestedRetailPrice) {
//     let discount = Math.round(product.SuggestedRetailPrice - product.FinalPrice, 1)
//     document.getElementById('poduct-discount').innerHTML = `Discount: $${discount}`;
//   }

  

//   document.getElementById('addToCart').dataset.id = product.Id;
// }

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
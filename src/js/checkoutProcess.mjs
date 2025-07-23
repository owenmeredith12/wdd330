import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {

  constructor() {
    // this.productId = productId;
    // this.product = {};
    // this.dataSource = dataSource;
  }

  calcSubtotal() {
    const cartItems = getLocalStorage('so-cart') || [];
    let total = 0; 
    for ( let i =0; i < cartItems.length; i++){
        console.log(cartItems[i].FinalPrice);
        total += cartItems[i].FinalPrice;
    }
    console.log(total);
  }

  calcOrderTotal(){

  }
}
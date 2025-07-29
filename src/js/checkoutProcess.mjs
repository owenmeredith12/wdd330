import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {

  constructor(key, outputSelector) {
    this.key = this.key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init(){
    this.list = getLocalStorage(this.key);
    this.calcItemSumary();

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
    const cartItems = getLocalStorage('so-cart') || [];
    let total = 0; 
    let tax = 0;
    for (let i =0; i < cartItems.length; i++){
        console.log(cartItems[i].FinalPrice);
        total += cartItems[i].FinalPrice;
    }

    total += total *= .06;
    
    if (cartItems.length > 0){
        tax = 10;
    }
    else if(cartItems.length > 1 ){
        tax = 10;
        tax += ((cartItems.length - 1) *2);
    }
    total += tax;
    console.log(total);
  }

}
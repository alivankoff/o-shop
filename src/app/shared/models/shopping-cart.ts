import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCartService } from '../service/shopping-cart.service';

import { Product } from './product';


export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: {[productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for ( const productId in this.itemsMap) {
      if (itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
          this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
      }
    }
  }

  getQuantity(product: Product): number {
    // console.log(product);
    const item: ShoppingCartItem = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      if ((this.items).hasOwnProperty(productId)) {
        sum += this.items[productId].totalPrice;
      }
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.items) {
      if ((this.items).hasOwnProperty(productId)) {
        count += this.items[productId].quantity;
      }
    }
      return count;
  }
}

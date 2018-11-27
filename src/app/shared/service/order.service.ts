import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';

import { Injectable } from '@angular/core';


@Injectable()
export class OrderService {

  basePath = '/orders';

  constructor(private db: AngularFireDatabase,
              private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list(this.basePath).push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list(this.basePath);
  }

  getOrdersByUser(userId: string) {
    return this.db.list(this.basePath, {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }
}

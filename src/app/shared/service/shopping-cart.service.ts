import { query } from '@angular/core/src/render3/instructions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import * as firebase from 'firebase/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable()
export class ShoppingCartService {
  private basePath = '/shopping-carts/';

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise <Observable <ShoppingCart>> {
    // -- if cart is not @local, request from the db.
    const cartId = await this.getOrCreateCartId();
    return this.db.object(this.basePath + cartId)
               .map( x => new ShoppingCart( x.items ));
  }

  async addToCart(product: Product) {
    this.updateItem(product, +1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object(this.basePath + cartId + '/items/').remove();
  }

  // --- private methods
  private create() {
    return this.db.list( '/shopping-carts' ).push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(this.basePath + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

    /* * because we need only cartId, we don't use return product only id * */
    // if ( !cartId ) {
    //   const result = await this.create();
    //   localStorage.setItem('cartId', result.key);
    //   return this.getCart(result.key);
    // }
    //   return this.getCart(cartId);
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      const quantity = (item.quantity || 0) + change;
      if (quantity === 0 ) { item$.remove(); } else {
          item$.update({
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: (item.quantity || 0) + change
          });
      }
    });
  }

}

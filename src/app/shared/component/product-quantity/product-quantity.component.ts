import { Component, Input } from '@angular/core';

import { ShoppingCartService } from 'shared/service/shopping-cart.service';

import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}

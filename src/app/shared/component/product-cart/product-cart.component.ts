import { Component, Input } from '@angular/core';

import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

import { ShoppingCartService } from 'shared/service/shopping-cart.service';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';



@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})

export class ProductCartComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }

    addToCart() {
      this.cartService.addToCart(this.product);
    }
}

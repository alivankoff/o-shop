import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Shipping } from '../../../shared/models/shipping';

import { ShoppingCartService } from '../../../shared/service/shopping-cart.service';
import { OrderService } from '../../../shared/service/order.service';
import { AuthService } from '../../../shared/service/auth.service';





@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping = {};
  subscription: Subscription;
  userId: string;

constructor(private router: Router,
            private authService: AuthService,
            private orderService: OrderService ) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    // const order = new Order(this.userId, this.shipping, this.cart);
    const order = this.doOrder(this.userId, this.shipping, this.cart);
    console.log('start. --------------------------------------------');
    console.log('1. userId= ' + order.userId);
    console.log('2. shipping= ', order.shipping);
    console.log('3. datePlaced', order.datePlaced);
    console.log('4. items', order.items);
    console.log('end. --------------------------------------------');
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  private doOrder(userId: string,
                  shipping: any,
                  shoppingCard: ShoppingCart) {
          const  order = {
              userId: this.userId,
              datePlaced: new Date().getTime(),
              shipping: this.shipping,
              items: this.cart.items.map(i => {
                    return {
                      product: {
                          title: i.title,
                          image: i.imageUrl,
                          price: i.price
                      },
                      quantity: i.quantity,
                      totalPrice: i.totalPrice
                    };
              })
          };
    return order;
  }

}

import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCartService } from '../../../shared/service/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})

export class ShoppingCartSummaryComponent {

  @Input() cart: ShoppingCartService;


}

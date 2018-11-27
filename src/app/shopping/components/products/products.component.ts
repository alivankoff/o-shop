import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from 'shared/service/product.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent  implements OnInit {
  products: Product[] = [];
  filteredProduct: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private soppingCartService: ShoppingCartService) {  }



  async ngOnInit() {
    this.cart$ = await this.soppingCartService.getCart();

    this.populateProducts();
  }

  private populateProducts() {
    this.productService
        .getAll()
        .switchMap(products => {
              this.products = products;
              return this.route.queryParamMap;
        })
        .subscribe(params => {
            this.category = params.get('category');
            // console.log('DBuG: category= ', this.category);

          this.applyFilter();
        });
  }

  private applyFilter() {
    this.filteredProduct = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}



/*
    productService
                .getAll()
                .switchMap(products => {
                      this.products = products;
                      return route.queryParamMap;
                })
                .subscribe(params => {
                    this.category = params.get('category');
                    console.log('DBuG: category= ', this.category);

          this.filteredProduct = (this.category) ?
               this.products.filter(p => p.category === this.category) :
               this.products;
      });
*/

import { Component, ViewChild, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { MatCard } from '@angular/material';

import { ProductService } from 'shared/service/product.service';
import { Product } from 'shared/models/product';


@Component({
  selector: 'app-admin-products-other-view',
  templateUrl: './admin-products-other-view.component.html',
  styleUrls: ['./admin-products-other-view.component.css']
})

export class AdminProductsOtherViewComponent implements OnDestroy {

  products: Product[];
  private filteredProducts: Product[];
  private subscription: Subscription;
  loading = true;
  rows;
  selected = [];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
        .subscribe(products => {
          this.filteredProducts = this.products = products;
    });
  }

  filter( query: string ) {
    const q = query.trim().toLowerCase();

    this.filteredProducts = (query) ?
         this.products.filter(p => p.title.toLowerCase().includes( q )) : this.products;
  }

  clear() {
    console.log('clear');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRowClass() {
    return 'background: { #ff0; }';
  }

  onSelect({ selected }) {
    console.log('DBuG: Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('DBuG: Activate Event', event);
  }
}

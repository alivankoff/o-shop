import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';

import 'rxjs/add/operator/take';

import { Product } from '../../../shared/models/product';
import { CategoryService } from '../../../shared/service/category.service';
import { ProductService } from '../../../shared/service/product.service';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent {

  categories$;
  product = {
    title: '',
    price: 0,
    imageUrl: '',
    category: ''
  };
  id = '';

  constructor(
         private router: Router,
         private route: ActivatedRoute,
         private categoryService: CategoryService,
         private productService: ProductService ) {

    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if ( this.id ) {
      this.productService.get( this.id ).take(1).subscribe( p => this.product = p );
    }
  }

  save(product) {
    if ( this.id ) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this item?') ) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  back() {
    this.router.navigate(['/admin/products']);
  }
}

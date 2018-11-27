import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCartComponent } from 'shared/component/product-cart/product-cart.component';
import { DataTableModule } from 'angular5-data-table';

import { MatComponentsModule } from './../mat-components.module';
import { ProductQuantityComponent } from './component/product-quantity/product-quantity.component';
import { AuthGuard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { CategoryService } from './service/category.service';
import { OrderService } from './service/order.service';
import { ProductService } from './service/product.service';
import { ShoppingCartService } from './service/shopping-cart.service';
import { UserService } from './service/user.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    DataTableModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  declarations: [
    ProductCartComponent,
    ProductQuantityComponent,
  ],
  exports: [
    CommonModule,
    ProductCartComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    DataTableModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
})
export class SharedModule { }

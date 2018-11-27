import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminAuthGuard } from 'admin/service/admin-auth-guard.service';
import { AuthGuard } from 'shared/service/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { MatComponentsModule } from './../mat-components.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsOtherViewComponent } from './components/admin-products-other-view/admin-products-other-view.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsViewComponent } from './components/admin-products-view/admin-products-view.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products-view', component: AdminProductsViewComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products-other-view', component: AdminProductsOtherViewComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminProductsOtherViewComponent,
    ProductFormComponent,
    AdminProductsViewComponent,
  ],
  exports: [

  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }

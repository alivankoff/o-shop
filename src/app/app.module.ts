import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AdminModule } from 'admin/admin.module';
import { AdminAuthGuard } from 'admin/service/admin-auth-guard.service';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from 'app/app.component';
import { HomeComponent } from 'core/components/home/home.component';
import { LoginComponent } from 'core/components/login/login.component';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from './../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,

    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    AdminAuthGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgrxPrbaComponent } from './components/ngrx-prba/ngrx-prba.component';
import { AddProductComponent } from './components/product-list/add-product/add-product.component';
import { EditComponent } from './components/product-list/edit/edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product-list/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { SellingComponent } from './components/selling/selling.component';
import { AuthenticationServiceService } from './services/Authentication/authentication-service.service';

const appRoutes: Routes = [

  { path: "", component: ProductListComponent },
  { path: "main", component: ProductListComponent },
  { path: "login", component:LoginComponent},
  { path: "register", component:RegisterComponent },
  { path: "details/:id", component: ProductComponent},
  { path: 'selling', component: SellingComponent, canActivate: [AuthenticationServiceService]  },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthenticationServiceService]},
  { path: 'addProduct', component: AddProductComponent, canActivate: [AuthenticationServiceService]},
  { path: 'ngrx', component: NgrxPrbaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

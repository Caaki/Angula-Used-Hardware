import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product-list/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFilterPipe } from './filters/product-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { SellingComponent } from './components/selling/selling.component';
import { EditComponent } from './components/product-list/edit/edit.component';
import { AddProductComponent } from './components/product-list/add-product/add-product.component';
import { NgrxPrbaComponent } from './components/ngrx-prba/ngrx-prba.component';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './components/ngrx-prba/simple.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    ProductFilterPipe,
    FooterComponent,
    SellingComponent,
    EditComponent,
    AddProductComponent,
    NgrxPrbaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({messaeg:simpleReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

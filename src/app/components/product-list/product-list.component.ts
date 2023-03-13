import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { throws } from 'assert';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product-model/product';
import { UserService } from 'src/app/services/user-service/user.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products!: Product[]
  @Input() searchText:any;

  constructor(private _productService: ProductService, private _userService:UserService) {
    this._productService.getProducts().subscribe((data) =>{
      this.products = data;
    });
   }

  ngOnInit(): void {
  }



}

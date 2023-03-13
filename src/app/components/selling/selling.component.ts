import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product-model/product';
import { AuthenticationServiceService } from 'src/app/services/Authentication/authentication-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {

  products: Product[];
  @Input() searchText:any;


  constructor(private _productService:ProductService, private _authService: AuthenticationServiceService) { 
    this._productService.getByUserId(this._authService.user.id).subscribe((data) =>{
      this.products = data;
  });
  }

  ngOnInit(): void {
  }

}

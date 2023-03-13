import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product-model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private _productService: ProductService, private route: ActivatedRoute) { }

  public product!: Product;

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      let id = params['id'];
      this._productService.getProduct(id).subscribe((item)=>{
        this.product = new Product (item.id, item.userId,item.manufacturer,item.model,item.description,item.price, item.type, item.image, item.mobile);
      });
    });
  }

}

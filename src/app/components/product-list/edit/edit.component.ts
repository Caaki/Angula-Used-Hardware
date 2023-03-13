import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product-model/product';
import { User } from 'src/app/models/user-model/user';
import { AuthenticationServiceService } from 'src/app/services/Authentication/authentication-service.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user-service/user.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  public registerForm: FormGroup;
  @Input() product: Product;
  product2:Product;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private _productService: ProductService, private _authenticationService:AuthenticationServiceService) { 
    this.route.params.subscribe(params =>{
      let id = params['id'];
      this._productService.getProduct(id).subscribe((item)=>{
        if(item) {
          this.product = new Product (item.id, item.userId,item.manufacturer,item.model,item.description,item.price, item.type, item.image, item.mobile);
          this.product2 = new Product (item.id, item.userId,item.manufacturer,item.model,item.description,item.price, item.type, item.image, item.mobile);
          this.initForms();
        }
      });
    });
    
  }

  ngOnInit(): void {
    
  }




  public initForms(){
    this.registerForm = this.fb.group({
      manufacturer: [this.product.manufacturer, [Validators.required, Validators.minLength(3)]],
      model: [this.product.model, [Validators.required, Validators.minLength(4)]],
      price: [this.product.price, [Validators.required]],
      type: [this.product.type, [Validators.required, Validators.minLength(4)]],
      image: [this.product.image, [Validators.required]],
      mobile: [this.product.mobile, [Validators.required]],
      description: [this.product.description, [Validators.required]]
    });
  }

  public submitForm(){
    if(!this.registerForm.valid){
      Swal.fire({
        title: 'Error!',
        text: "All fields must have at least 3 characters",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }
    else{
      let newPoduct = new Product(
        this.product.id,
        this.product.userId,
        this.registerForm.get("manufacturer")?.value,
        this.registerForm.get("model")?.value,
        this.registerForm.get("description")?.value,
        this.registerForm.get("price")?.value,
        this.registerForm.get("type")?.value,
        this.registerForm.get("image")?.value,
        this.registerForm.get("mobile")?.value
      );
      this._productService.updateProduct(newPoduct).subscribe(
        (response) => {
          Swal.fire({
            title: 'Success!',
            text: "Product updated successfully",
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#018281'
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: "An error occurred while updating the product",
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#018281'
          });
        }
      );
    }
  }
}
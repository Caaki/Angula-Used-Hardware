import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product-model/product';
import { AuthenticationServiceService } from 'src/app/services/Authentication/authentication-service.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  
  public registerForm: FormGroup;
  
  product2:Product;

  constructor(private fb: FormBuilder,private _productService: ProductService, private _authenticationService:AuthenticationServiceService) { 
    this.initForms();
  }

  ngOnInit(): void {
    
  }




  public initForms(){
    this.registerForm = this.fb.group({
      manufacturer: ['', [Validators.required]],
      model: ['', [Validators.required ]],
      price: ['', [Validators.required]],
      type: ['', [Validators.required ]],
      image: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  public submitForm(){
    if(!this.registerForm.valid){
      Swal.fire({
        title: 'Error!',
        text: "All fields must be filled",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }
    else{
      let newPoduct = new Product(
        this._productService.getNextId(),
        this._authenticationService.user.id,
        this.registerForm.get("manufacturer")?.value,
        this.registerForm.get("model")?.value,
        this.registerForm.get("description")?.value,
        this.registerForm.get("price")?.value,
        this.registerForm.get("type")?.value,
        this.registerForm.get("image")?.value,
        this.registerForm.get("mobile")?.value
      );
      this._productService.addProduct(newPoduct).subscribe(
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
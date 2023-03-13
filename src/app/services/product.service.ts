import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product-model/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  json_locatio = 'http://localhost:3000/products';

  constructor(private _httpClient: HttpClient) { }

  public getNextId(){
    let max = 0;
    this.getProducts().subscribe(users =>{
      users.forEach(curent =>{
        if(curent.id > max){
          max=curent.id;
          
        }
      });
      return max+1;
    });
   return max;
  }


  private _createProductFromObject(item:any){
    return new Product (item.id, item.userId,item.manufacturer,item.model,item.description,item.price, item.type, item.image, item.mobile)
  }

  public getProducts(): Observable<Product[]>{
    return this._httpClient.get<Product[]>(this.json_locatio).pipe(
    map((data: any[]) => data.map((item: any) => this._createProductFromObject(item)))
    );
  }

  public getProduct(id: Number): Observable<Product>{
    return this._httpClient.get<Product>(this.json_locatio+"/"+id).pipe(
      map((data: Product) => this._createProductFromObject(data))
    );
  }

  public deleteProduct(id: Number): Observable<Product>{
    return this._httpClient.delete(this.json_locatio+"/"+id).pipe(
      map((data: any)=> this._createProductFromObject(data))
    );
  }

  public createProduct(product: Product): Observable<Product>{
    return this._httpClient.post(this.json_locatio, product).pipe(
      map((data: any) => this._createProductFromObject(data))
    );
  }

  public getByUserId(userId: number):Observable<Product[]>{
      return this._httpClient.get<Product[]>(this.json_locatio).pipe(
        map((products:Product[])=> {
          return products.filter(product => product.userId == userId);
        }),
        map(items => items.map(item =>
          this._createProductFromObject(item)))
      );
  }

  public updateProduct(product: Product): Observable<Product>{
    return this._httpClient.put(this.json_locatio+"/"+product.id, product).pipe(
      map((data: any) => this._createProductFromObject(data))
    );
  }

  public addProduct(product:Product) : Observable<Product>{
    return this._httpClient.post(this.json_locatio,product).pipe(
      map((data:any)=> this._createProductFromObject(data))
    );
  }
  


}

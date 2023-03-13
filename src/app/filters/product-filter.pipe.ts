import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product-model/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if(!products) return [];
    else if (!searchText) return products;
    searchText = searchText.toLocaleLowerCase();
    return products.filter((product: Product) =>{
      return (product.model.toLowerCase().includes(searchText) || 
              product.manufacturer.toLowerCase().includes(searchText) || 
              product.type.toLowerCase().includes(searchText))
    })
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../models/Products';

@Pipe({
    name: 'searchPipe'
})
export class ProductsNamePipe implements PipeTransform {

    transform(products: Products[], subText: string): any {
        return products.filter(product => product.productName.includes(subText));
    }
}

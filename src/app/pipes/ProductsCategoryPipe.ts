import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../models/Products';

@Pipe({
    name: 'categoryPipe'
})
export class ProductsCategoryPipe implements PipeTransform {

    transform(products: Products[], categorySubText: string): any {
        return products.filter(product => product.categoryName.includes(categorySubText));
    }
}

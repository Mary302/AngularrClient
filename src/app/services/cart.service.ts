import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem'


@Injectable({
  providedIn: 'root'
})

export class CartService {
  public products : Products[]
  public nameList: string
  public totalPrice: number
  public amount : number
  public cartId : number
  public isOrderLaunched: boolean



  constructor(private http: HttpClient) {
    this.products=[]
    this.nameList=""
    this.amount=0;
    this.cartId=0
   }
   private DOMAIN = "http://localhost:3000";


   public addToCart(currentProduct : Products, amount){
     
     let productToAdd = { product: currentProduct,
                          units: amount}

       //  The http request will be sent after the subscribe() method will be called
       return this.http.post(`${this.DOMAIN}/cartItem`,productToAdd);
   }

   public deleteCartitem(product: Products) {
    //  The http request will be sent after the subscribe() method will be called
    return this.http.delete(`${this.DOMAIN}/cartItem/:${product.productId}`);
  }

   public getMyItems(): Observable<CartItem[]> {
    
    //  The http request will be sent after the subscribe() method will be called
    return this.http.get<CartItem[]>(`${this.DOMAIN}/cartItem/myCart`);
}
 public deleteMyCart(){
  return this.http.delete(`${this.DOMAIN}/cartItem/`)
}
public getTotalPrice(): Observable<CartItem[]> {
    
  //  The http request will be sent after the subscribe() method will be called
  return this.http.get<CartItem[]>(`${this.DOMAIN}/cartItem/myPrice`);
}

public getRecentCart(): Observable<any> {
    
  //  The http request will be sent after the subscribe() method will be called
  return this.http.get<number>(`${this.DOMAIN}/shoppingCart`);
}
}


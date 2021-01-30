import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import {HttpHeaders} from '@angular/common/http';
// const headers = new HttpHeaders({ 'Content-Type': 'application/json',
// 'Accept': 'application/json',
// 'Access-Control-Allow-Headers': 'Content-Type',
// );

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  private DOMAIN = "http://localhost:3000";
  public productToUpdate : Products;
  public categoryAr: [{}];
  public isUploadPhoto:boolean


  constructor(private http: HttpClient) {
    this.categoryAr= [{}]
   }

  public getAllProducts(): Observable<Products[]> {

      //  The http request will be sent after the subscribe() method will be called
      return this.http.get<Products[]>(`${this.DOMAIN}/products`);
  }


    public countProducts() {
      return this.http.get(
        `${this.DOMAIN}/products/amountOfProducts`
      );
    }

public addProduct(formData) {
 
  return this.http.post(`${this.DOMAIN}/products/addProduct`,formData );
}

  public upload(formData) {


    return this.http.post<any>(`http://localhost:3000/products/uploads/`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}

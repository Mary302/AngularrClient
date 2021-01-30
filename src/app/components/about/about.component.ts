import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { UsersService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Products } from '../../models/Products';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormControl, Validators,FormGroupDirective } from '@angular/forms';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 
  public items : CartItem[];
  

  constructor(public cartService : CartService,
              public usersService : UsersService,
              public productsService: ProductsService,
              private router : Router,
             ) {
                             }

              ngOnInit(): void {
                //initializing out displayed items to prevernt overlap
                this.cartService.products=[];
                this.cartService.totalPrice=0;
                //making sure user is logged in
                this.usersService.isLoggedIn()
                
                if (this.usersService.isLogged === true && !this.usersService.isAdmin){
                  try{
                    //if logged in get items
                  this.getMyItems();}
                  catch(err){
                    console.log("ABOUT TS" + err)
                  }
                  
                }
                 
            
              } 


              public getMyItems() {
                this.getTotalPrice();
                this.items = [];
                //getting the user's products from server;
                let observale = this.cartService.getMyItems();
                observale.subscribe((allItems) => {
                  //to display them we push the array into a public variable
                  //one by one and displaying that array..
                  for (let item of allItems){
                   this.cartService.products.push(item)}
                   return;
               }, errorObject => {
                    alert(errorObject);
                }) 
              }

              public deleteCartitem(product: Products) {
                //extracting item's index so we can remove it from display.
                let index = this.cartService.products.indexOf(product);
                //updating display of total price...
               this.cartService.totalPrice += +-(this.cartService.products[index].productPrice * this.cartService.products[index].quantity)
                this.cartService.products.splice(index, 1);
                //deleting the product from user's cart in server..
                let observable = this.cartService.deleteCartitem(product);
                observable.subscribe((updatedItems) => {
                }, errorObject => {
                    alert(errorObject);
                }) 
              }

              public deleteMyCart(){
                
                //deleting all items in user's shopping cart
                let deletedCartObservable = this.cartService.deleteMyCart()
                deletedCartObservable.subscribe(
                  (deletedCart) => {
                    //updating display
                    this.cartService.products = [];
                    this.cartService.totalPrice =0;
                  },
                  (errorObject) => {
                    alert(JSON.stringify(errorObject));
                  }
                )
            } 

              public getTotalPrice(){
                let priceObservable = this.cartService.getTotalPrice();
                priceObservable.subscribe((myPrice) => {
                    this.cartService.totalPrice = myPrice[0].totalPice;
                    return;
          
                }, errorObject => {
                    alert(errorObject);
                })
                this.cartService.totalPrice=0;

              }
            
              public goToCheckOut(){
                this.router.navigate(["/checkout"])
              }
          }

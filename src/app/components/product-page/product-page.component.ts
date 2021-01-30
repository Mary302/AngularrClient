import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import {UsersService} from 'src/app/services/users.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  
 
 public ProductList:Products[];
 public units: number;
 public subText: string;
 public categorySubText :any;


  constructor(public productsService: ProductsService,
             private cartService : CartService,
             public usersService: UsersService,
             private router : Router,
             private route: ActivatedRoute) {
               
             
              }

  
  
  ngOnInit(): void {
    this.router.navigate(['products'], { relativeTo: this.route });
    this.cartService.totalPrice =0;
    this.cartService.products=[];
    this.units=0;
    this.subText = "";
    this.categorySubText="";


    this.usersService.isLoggedIn()
    if (this.usersService.isLogged === true){
      this.router.navigate(['products/about']);
      this.getCartId();
      this.getProducts();
    }
    if(this.usersService.isAdmin ===  true){
      this.router.navigate(['products/admin']);
    }
  
  }


  public getProducts () {
    this.ProductList = [];
      let allProductsObservable = this.productsService.getAllProducts();
      allProductsObservable.subscribe(allProducts => {
          this.ProductList=allProducts;
          for(let item of this.ProductList){
            if(this.productsService.categoryAr.includes(item.categoryName)){
            }else{
              this.productsService.categoryAr.push(item.categoryName)
            }
         }
         this.productsService.categoryAr.splice(0,1)

      }, errorObject => {
          alert(errorObject);
      })
  }

  public setQuantity(){
 
    this.cartService.amount = this.units;

  }

  public getCategoryItems(categoryName) {
    this.categorySubText = categoryName;
  }

  public addToCart(product: Products){    
    let amount = this.cartService.amount;
    if(amount ===  0 ||undefined || null){
      alert("cant add null items")
      return;
    }

    let observable = this.cartService.addToCart(product, amount);
    this.cartService.products

    observable.subscribe();

    let itemToUpdate = this.cartService.products.find(item=>item.productName==product.productName)

    if(itemToUpdate){
      //if item that was added already in cart so update quantity
      this.updateItem(product)
      
      
    }else{
      
      //if product is new to cart - add it
      product.quantity = amount;
      product.totalPice = amount * product.productPrice ;
      this.cartService.totalPrice =  +this.cartService.totalPrice + (amount * product.productPrice) ;
      this.cartService.products.push(product);

  }
  
    
  }   
  public getCartId(){
    //checking if cart that is saved in seesionStorage is not 
    //checkedOut , if so - open a new cart to continue shopping
    let cartId =this.cartService.getRecentCart()
    cartId.subscribe((myCart) => {

        let userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));
        if(userDetails.cartId !== myCart ){
            userDetails.cartId = myCart
            userDetails.isCheckedOut =null;
            sessionStorage.setItem( 'UserDetails', JSON.stringify(userDetails) )
        }

       return myCart;
   }, errorObject => {
        alert(errorObject);
    }) 
}
   
  
  public updateItem(product){
    let total=this.cartService.totalPrice

    for(let product of this.cartService.products){
      total+=(+product.productPrice * this.cartService.amount)
    }
      let item =this.cartService.products

    for (let i = 0; i < this.cartService.products.length; i++) {

        if(item[i].productId == product.productId){
          this.cartService.products[i].quantity = 
          this.cartService.products[i].quantity + this.cartService.amount;
          this.cartService.products[i].totalPice = this.cartService.products[i].productPrice * this.cartService.products[i].quantity
          this.cartService.totalPrice +=  (this.cartService.amount * this.cartService.products[i].productPrice) ;
           }
      }
  }

  //admin function - setting the product that needs to be updated
  //in a global variable so that we can access it from the admin componenet.
  public updateProduct(product: Products){
    
    this.productsService.productToUpdate = product;
  }

}



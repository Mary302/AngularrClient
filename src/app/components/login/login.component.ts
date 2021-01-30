import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
    public userLoginDetails: UserLoginDetails;
    public numberOfOrders: any;
    public numberOfProducts: any;

    constructor(public usersService: UsersService,
        public productService: ProductsService,
        public orderService: OrdersService,
        private router: Router,
                public cartService: CartService,
                private route : ActivatedRoute,
                ) {
                    this.numberOfOrders={}
                    this.numberOfProducts={}
                }

    ngOnInit(): void {
        let numberOfproductService = this.orderService.countOrders();
        numberOfproductService.subscribe((countOrders) => {
          this.numberOfOrders=countOrders
      })
    
      let numberOfProductsService = this.productService.countProducts();
      numberOfProductsService.subscribe((countProducts) => {
        this.numberOfProducts=countProducts
    })
        
        this.userLoginDetails = new UserLoginDetails()
        
    }

    loginDetails = new FormGroup({
        email : new FormControl('', [Validators.required]),
        password : new FormControl('', [Validators.required])
    })
   
    

    get email(){
        return this.loginDetails.get('email');
    }
    get password(){
        return this.loginDetails.get('password');
    }

    public login() {
        //checking if the inserted info is correct 
        const loginObservable = this.usersService.login(this.userLoginDetails);
        loginObservable.subscribe(successfulLoginResponse => {

            sessionStorage.setItem("LoginToken", "Bearer " + successfulLoginResponse.token);
            sessionStorage.setItem("UserDetails", JSON.stringify(successfulLoginResponse));

            this.usersService.isLogged == true;
            //checking userType to decide wehre to redirect them..
            
            if (successfulLoginResponse.userType === "CUSTOMER") {
                this.usersService.isAdmin = false;
               
                //if type is customer then check whether its their first visit or they are returned clients
                if (successfulLoginResponse.cartId === null) {
                    this.usersService.isFirstPurchase=true
                    return;
                  }
                  if (successfulLoginResponse.isCheckedOut == false) {
                    this.usersService.isContinuePurchase=true
                    return;
                  }
                  else  {
                    this.usersService.isNewPurchase=true
                    return;
                  }
                  
            }
            if (successfulLoginResponse.userType == "ADMIN") {
                this.usersService.isAdmin = true;
                this.usersService.isLogged = true;
                this.router.navigate(["/products/admin"]);//change to admin
            }
            

        }, errorObject => {
            alert(errorObject)
        });
    }
    public onRegisterClicked(){
        this.router.navigate(["/RegisterPage"])
    }
    public goToProducts(){
        this.router.navigate(['/products/about']);

    }
    

}

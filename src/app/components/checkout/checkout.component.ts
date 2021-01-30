import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { Order } from '../../models/orders';
import { OrdersService } from '../../services/orders.service' 
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from 'src/app/services/cart.service';
import {UserRegisterDetails} from '../../models/UserRegisterDetails'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public checkOutForm: FormGroup;
  public city: FormControl;
  public address: FormControl;
  public shippingdate: FormControl;
  public creditcard: FormControl;
  public order : Order;
  public orderToDownload: any;
  public tomorrow_date: string;
  public max_date: string;
  public userDetails: UserRegisterDetails;
  @ViewChild('address') addressInput: FormControl;

  constructor(
    public ordersService : OrdersService,
    public cartService : CartService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));

    //initializing our FormControls
    this.order = new Order ();
    this.city = new FormControl("", [Validators.required]);
    this.address = new FormControl("", [Validators.required]);
    this.shippingdate = new FormControl("", [Validators.required]);
    this.creditcard = new FormControl("", [Validators.required, Validators.pattern('[0-9]{4}')]);

    //binding FormControls to HTMLT inputs using name..
    this.checkOutForm = new FormGroup ({
      city : this.city,
      address : this.address,
      shippingdate: this.shippingdate,
      creditcard : this.creditcard
    })

    //setting the user's details into inputs by default
    // once component is loaded for better UX
    this.checkOutForm.controls['city'].setValue(this.userDetails.city)
    this.checkOutForm.controls['address'].setValue(this.userDetails.address)
    
    //check for avaliable dates..
    this.initDate();
    this.getUnavailableOrderDates();
  }

  public checkOut(): void {
    this.order.city = this.city.value;
    this.order.address = this.address.value;
    this.order.shippingdate = this.shippingdate.value;
    this.order.creditcard = this.creditcard.value;
   
    //extracting all the UNavailable dates..
    for (let key of Object.keys(this.ordersService.unavailableOrderDates)) {
      let unavailableDates = this.ordersService.unavailableOrderDates[key];
      if(unavailableDates.ship_date===this.order.shippingdate){
            alert("Sorry, this date is taken. Please choose a different date")
            return
          }
    }
  
    //once eberything is ok we send the request.
    const observable = this.ordersService.checkOut(this.order);

    observable.subscribe(
      () => {
        this.orderToDownload = this.order;
        this.cartService.isOrderLaunched = true;

      },
      (serverErrorResponse) => {
        alert(
          "Error! Status: " +
            serverErrorResponse.status +
            ", Message: " +
            serverErrorResponse.message
        );
      }
    );
  }
  

  //once order has launched we ask the user if he wished to stay or log out
 public logout() {
  this.cartService.isOrderLaunched = false;
   sessionStorage.clear()
   this.router.navigate(['login']);
  }
  public toProducts(){
    this.cartService.isOrderLaunched = false;

    this.router.navigate(['products']);
  }


  //getting unavailable dates for shipping
  public initDate() {
    let tomorrow_date = new Date();
    let max_date = new Date();
    tomorrow_date.setDate(tomorrow_date.getDate() + 1);
    max_date.setDate(max_date.getDate() + 30);

    this.tomorrow_date = tomorrow_date.toISOString().split("T")[0];
    this.max_date = max_date.toISOString().split("T")[0];
  }

  public getUnavailableOrderDates() {
    const observable = this.ordersService.getUnavailableOrderDates();
    observable.subscribe(
      (unavailableDates) => {
        this.ordersService.unavailableOrderDates = unavailableDates;
      },
      (serverErrorResponse) => {
        alert(
          "Error! Status: " +
            serverErrorResponse.status +
            ", Message: " +
            serverErrorResponse.message
        );
      }
    );
  }

  
//once the download button is clicked
  public downloadTxtRecipe() {
    this.dyanmicDownload({
      fileName: 'My Report',
      text: this.getReceipt(),
    });
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement,
    },
  };

  private dyanmicDownload(arg: { fileName: string; text: string }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType =
      arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute(
      'href',
      `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`
    );
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent('click');
    element.dispatchEvent(event);
  }

  getReceipt() {
    let productsArray = [];
    let user =JSON.parse(sessionStorage.getItem('UserDetails'));

    //setting all of our cart products into the receipt
    for (let i = 0; i < this.cartService.products.length; i++) {
      productsArray.push(
        `${this.cartService.products[i].productName}"x"(${this.cartService.products[i].quantity})`
        
      );

    }
    
    let creditCardNumber = this.orderToDownload.creditcard
    let encodedCreditNumber = 'XXXX-XXXXX-' + creditCardNumber;

    return `Dear ${user.name}, your order has been sent!\r\n\r\n
    There are your shopping details :\r
    Products:  ${productsArray}\r\n
    Shipping date:  ${this.orderToDownload.shippingdate}\r\n
    Shipping adress:  ${this.orderToDownload.city} , ${this.orderToDownload.address}\r\n
    Credit card:  ${encodedCreditNumber}\r\n
    Total price:  ${this.cartService.totalPrice}₪\r\n
    **Please make sure to save this recipe for the delivery and insurance!\r\n\r\n
    Thanks for shopping with us, We hope to see you again soon  :)\r\n
    -------------------------- :) --------------------------`;
  }
  


}

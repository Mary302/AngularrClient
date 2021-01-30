import { Component, OnInit , ViewChild, ElementRef,Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { Products } from '../../models/Products';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',]
})

export class AdminComponent implements OnInit {

  @ViewChild("fileUpload", { static: false })
  fileUpload: ElementRef;
  public isAddProductModal :boolean;

  public selectedFile : File;
  public files = [];
  public uploadedImageName;
  public product : Products[];

  public customizeProductForm: FormGroup;
  public productName: FormControl;
  public productPrice: FormControl;
  public categoryName: FormControl;
  public productImage: FormControl;
  public productDescription: FormControl;
  
  constructor(public cartService : CartService,
    public usersService : UsersService,
    public productsService: ProductsService,
    private router : Router,
    
    ) { 
  }

  ngOnInit(): void {
                
    this.cartService.products=[];
    this.cartService.totalPrice=0;
    //checking if user is logged in...
    this.usersService.isLoggedIn()
    
    if (this.usersService.isLogged === true && !this.usersService.isAdmin){
      try{
      this.router.navigate['/menu'];}
      catch(err){
        console.log("ABOUT TS"+err)
      }
      
    }

     //initializing FormControl inputs and setting patterns for validations
      this.productName = new FormControl('', [Validators.required]);
      this.productPrice = new FormControl('', [Validators.required, Validators.pattern('[0-9]{1-5}')]);
      this.categoryName = new FormControl('', [Validators.required]);
      this.productImage = new FormControl('', [Validators.required]);
      this.productDescription = new FormControl('', [Validators.required]);

      //binding between inputs and FormControls..
      this.customizeProductForm = new FormGroup({
        productName: this.productName,
        productPrice: this.productPrice,
        categoryName: this.categoryName,
        productImage: this.productImage,
        productDescription: this.productDescription
      });

          
      

  } 

  public editProduct(){
   
     //n the next 4 "if"s we check if any of the product fields was left empty
     //if so we extract the old value of the product.            
    this.productsService.productToUpdate.productPrice = this.productPrice.value;
    if(this.productName.value.length !=  0){
      this.productsService.productToUpdate.productName = this.productName.value;
    }
    if(this.productDescription.value.length !=  0){
      this.productsService.productToUpdate.productDescription = this.productDescription.value;
    }
    
    if(this.productPrice.value.length !=  0){
      this.productsService.productToUpdate.productPrice = this.productPrice.value;
    }
    else{
      this.productsService.productToUpdate.categoryName = this.categoryName.value;
      
    }
    //once validation is done and good we call for server update
    this.updateProductChanges()
  }

  public closeAddProductModal() {
    this.isAddProductModal = false;
  }


  public openAddProductModal(){
    this.isAddProductModal = true;
    //initializing so it wont be overlapped by "editProduct()"
    this.productsService.productToUpdate=
                        {   productId: 0,
                            productImage: "",
                            productName: "", 
                            productDescription: "", 
                            productPrice: 0}
  }

  public onClick() {
    // Clearing the files from previous upload
    this.files = [];
    // Extracting a reference to the DOM element named #fileUpload
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {

        const file = fileUpload.files[0];

        //saving all the data we need for server request
        this.files.push({ name: file.name, 
                          data: file,
                          inProgress: false,
                          progress: 0 });
  
      this.fileUpload.nativeElement.value= "";
      //setting the image display
      this.productsService.productToUpdate.productImage = file.name;
 
    };
    fileUpload.click();
  }

  public updateProductChanges() {
    let updatedProduct = this.productsService.productToUpdate;
    
    //another validation for empty inputs.
    let x = this.customizeProductForm.value.productName;
    if (x.length != 0) { updatedProduct.productName = x;}
    else {updatedProduct.productName = this.productsService.productToUpdate.productName}

    x = this.customizeProductForm.value.categoryName;
    if (x.length != 0) updatedProduct.categoryName = x;
    else
      updatedProduct.categoryName = this.productsService.productToUpdate.categoryName;

    x = this.customizeProductForm.value.productPrice;
    if (x === "") {updatedProduct.productPrice = this.productsService.productToUpdate.productPrice;}
    else
    updatedProduct.productPrice = x;
    
    x = this.customizeProductForm.value.productDescription;
    if (x.length != 0) updatedProduct.productDescription = x;
    else
      updatedProduct.productDescription = this.productsService.productToUpdate.productDescription;
  
    let file = this.files[0];

    //binding all of our form inputs into one object of FormData
    const customizeProductForm = new FormData();
    customizeProductForm.append('productId', updatedProduct.productId + '');
    customizeProductForm.append('productName', updatedProduct.productName);
    customizeProductForm.append('categoryName', updatedProduct.categoryName);
    customizeProductForm.append('productPrice', updatedProduct.productPrice + '');
    //If admin didn't upload another image, use old product image instead
    if (this.files[0] == undefined) {
      let oldImage = updatedProduct.productImage;
      oldImage.substr(oldImage.lastIndexOf('/') + 1);
      customizeProductForm.append('image', oldImage);
    } else {
      customizeProductForm.append('image', file.name);
      customizeProductForm.append('file', file.data);
    }


    //since i am using same form for Update and Add new product

    if( this.isAddProductModal == true){
      //checking if admin is ADDING a new product then we should append the description value
    // since it does not exists yet.
      customizeProductForm.append('productDescription', updatedProduct.productDescription);
      let observable = this.productsService.addProduct(
        customizeProductForm
      );
      observable.subscribe(() => {
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      });
      (errorObject) => {
        alert(errorObject);
      };
    } else{
      //if he's only updating then we immidiatlly send in the request...
    let observable = this.productsService.upload(
      customizeProductForm
    );
    observable.subscribe(() => {
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    });
    (errorObject) => {
      alert(errorObject);
    };
  }
}
}



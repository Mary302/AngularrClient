import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userDetails: UserRegisterDetails;

  constructor(private router: Router,
    public usersService: UsersService, 
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usersService.isLoggedIn()
                
    if (this.usersService.isLogged === true){
      try{
        //if logged in say hello to the customer
      this.sayHello();}
      catch(err){
        console.log("ABOUT TS" + err)
      }
      
    }
  }

  public sayHello(){
    this.userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));

  }
  

  public logout() {
    sessionStorage.clear()
    this.usersService.isLogged = false;
    this.usersService.isFirstPurchase =false;
    this.usersService.isContinuePurchase =false;
    this.usersService.isNewPurchase =false;
    this.router.navigate(['login'], { relativeTo: this.route });
  }
}

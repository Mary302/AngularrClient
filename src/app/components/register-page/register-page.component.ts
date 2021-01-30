import { Component, OnInit } from "@angular/core";
import { UserRegisterDetails } from "src/app/models/UserRegisterDetails";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"],
})
export class RegisterPageComponent implements OnInit {
  public registryForm: FormGroup;
  public userID: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmpassword: FormControl;

  public userRegisterDetails: UserRegisterDetails;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.userRegisterDetails = new UserRegisterDetails();
    this.userID = new FormControl("", [Validators.required, Validators.pattern('[0-9]{9}')]);
    this.email = new FormControl("", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]);
    this.password = new FormControl("", [Validators.required, Validators.pattern('[A-Za-z0-9]{2,20}')]);
    this.confirmpassword = new FormControl("", [Validators.required, Validators.pattern('[A-Za-z0-9]{2,20}')]);

    this.registryForm = new FormGroup({
      userID: this.userID,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword,
    });
  }

  public register() {
    this.userRegisterDetails.userID = this.userID.value;
    this.userRegisterDetails.email = this.email.value;
    this.userRegisterDetails.password = this.password.value;
    sessionStorage.setItem(
      "registerDetails",
      JSON.stringify(this.userRegisterDetails)
    );
    this.router.navigate(["/RegisterComplete"]);
  }

  public checkPasswords(group: FormGroup) {
    let pass = group.get("password").value;
    let confirmpassword = group.get("confirmpassword").value;

    if (pass === confirmpassword && pass.length!= 0) {
      this.isRegisterDetailsValid();
    } else alert("passwords does not match")
    return;
  }

  
  // trying to validate with regex
  public isRegisterDetailsValid() {
    let pattern = new RegExp("^\\d{9}$");
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
    this.userRegisterDetails.userID = this.userID.value;
    this.userRegisterDetails.email = this.email.value;
    this.userRegisterDetails.password = this.password.value;
    try{
    if (this.userRegisterDetails.userID.match(pattern)) {
      console.log("k")
    }else{
    alert("userID must be 9 digits long and made entirely of numbers");
    return}
    if(this.userRegisterDetails.email.toLowerCase().match(re)||this.userRegisterDetails.email==null){
      console.log("kk")
    }else{
      alert("Please enter a valid Email address")
      return
    }
    if(this.userRegisterDetails.password==""){
      alert("password is mandatory")
      return
    }else{
      this.register()
    }
  }

catch { return }
}
}
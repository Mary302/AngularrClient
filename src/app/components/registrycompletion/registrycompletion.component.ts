import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserRegisterDetails } from "src/app/models/UserRegisterDetails";

@Component({
  selector: "app-registrycompletion",
  templateUrl: "./registrycompletion.component.html",
  styleUrls: ["./registrycompletion.component.css"],
})
export class RegistrycompletionComponent implements OnInit {
  public registryForm: FormGroup;
  public address: FormControl;
  public name: FormControl;
  public lastName: FormControl;
  public city: FormControl;

  public userRegisterDetails: UserRegisterDetails;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.userRegisterDetails = JSON.parse(
      sessionStorage.getItem("registerDetails")
    );
    this.address = new FormControl("", [Validators.required]);
    this.name = new FormControl("", [Validators.required, Validators.pattern('[A-Za-z]{2,15}')]);
    this.lastName = new FormControl("", [Validators.required, Validators.pattern('[A-Za-z]{2,25}')]);
    this.city = new FormControl("", [Validators.required,]);


    this.registryForm = new FormGroup({
      address: this.address,
      name: this.name,
      lastName: this.lastName,
      city: this.city
    });
  }


  public register() {
    this.userRegisterDetails.address = this.address.value;
    this.userRegisterDetails.name = this.name.value;
    this.userRegisterDetails.lastName = this.lastName.value;
    this.userRegisterDetails.city = this.city.value
    this.http
      .post("http://localhost:3000/users/register", this.userRegisterDetails)
      .subscribe(
        (result) => {
          this.router.navigate(["login"]);
        },
        (serverErrorResponse) => {
          alert(
            "Error! Status: " +
              serverErrorResponse.status +
              ", Message: " +
              serverErrorResponse.message
          );
          this.router.navigate(["RegisterPage"]);
        }
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { Observable } from 'rxjs';
import { SuccessfulLoginResponse } from '../models/SuccessfulLoginResponse';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public isAdmin : boolean;
    public isLogged : boolean;
    public isFirstPurchase :boolean;
    public isContinuePurchase :boolean;
    public isNewPurchase :boolean;
    



    private DOMAIN = "http://localhost:3000";

    constructor(private http: HttpClient) { 
    }
    public isLoggedIn(){
        let userDetails = JSON.parse(sessionStorage.getItem('UserDetails'));
        
        if( userDetails.userType === "ADMIN") {
            this.isLogged = true;
            this.isAdmin = true;

            return true;
        }
        if (userDetails.token !== null ){
            this.isLogged = true;
            return true;
        }
        
        this.isLogged = false;
        return false;
    }

    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginResponse> {

        //  The http request will be sent after the subscribe() method will be called
        return this.http.post<SuccessfulLoginResponse>(`${this.DOMAIN}/users/login`, userLoginDetails);
    }
    // public register(userRegisterDetails:UserRegisterDetails): void {
    //     this.http.post(`${this.DOMAIN}/users/`, userRegisterDetails);

    // }
}

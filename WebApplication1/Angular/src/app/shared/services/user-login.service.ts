import { Injectable } from '@angular/core';

@Injectable()
export class UserLogin {
    
    hasNotAuthenticated = false;
    constructor() {
    }

    getAuthenticationStatus(){
    return this.hasNotAuthenticated;
    }
    setAuthenticationStatus(status:boolean){
        this.hasNotAuthenticated = status;
        }
}
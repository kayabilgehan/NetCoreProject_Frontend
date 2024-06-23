import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44397/api/";

  constructor(private httpClient: HttpClient) { }

  login(loginModel: loginModel){
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else {
      return false;
    }
  }
}

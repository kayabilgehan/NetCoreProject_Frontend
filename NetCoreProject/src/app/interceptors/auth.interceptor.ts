import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { request } from 'http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if(typeof localStorage !== 'undefined'){
    let token = localStorage.getItem("token");
    let newRequest : HttpRequest<any>;
    newRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
    });
    return next(newRequest);
  }
  else{
    return next(request);
  }
};

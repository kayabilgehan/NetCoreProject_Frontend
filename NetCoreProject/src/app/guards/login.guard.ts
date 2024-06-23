import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);
  const httpClient = inject(HttpClient);
  
  if(authService.isAuthenticated()){
    return true;
  }
  else{
    toastrService.info("Please login.", "Error");
    router.navigate(["login"]);
    return false;
  }
};

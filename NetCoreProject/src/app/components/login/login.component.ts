import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, 
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.createSignInForm();
  }

  createSignInForm(){
    this.signInForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      rememberMe:[false, Validators.required]
    });
  }

  login(){
    if(this.signInForm.valid)
      {
        let loginModel = Object.assign({}, this.signInForm.value);
        this.authService.login(loginModel).subscribe(response => {
          if(response.success){
            localStorage.setItem("token", response.data.token);
            this.toastrService.success(response.message);
          }
          else {
            this.toastrService.error(response.message);
          }
        }, responseError => {
          this.toastrService.error(responseError.error, "Error");
        });
      }
  }
  
}

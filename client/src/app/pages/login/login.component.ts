import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginForm = true;
  isLoading = false;
  isRegistered = false;
  isAuth = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private notification: NzNotificationService) { }


  ngOnInit() {
    this.initializeForms();
    this.isAuth = this.authService.checkAuthentication();
  }

  submitLoginForm(input): void {
    console.log(input);
    this.isLoading = true;
    this.authService.accountLogin(input).subscribe((response) => {
      this.createNotification('success', 'Authentication', 'Account authenticated');
      console.log(response);
      this.isAuth = true;
    }, error => {
      console.log(error);
      this.createNotification('error', 'Request failed', error);
    }, () => {
      this.isLoading = false;
    });
  }

  submitRegisterForm(input): void {
    console.log(input);
    this.isLoading = true;
    this.authService.accountRegister(input).subscribe((response) => {
      this.createNotification('success', 'Authentication', 'Account created');
      console.log(response);
    }, error => {
      console.log(error);
      this.createNotification('error', 'Request failed', error);
    }, () => {
      this.isLoading = false;
    });
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  switchAuthentication(): void {
    this.isLoginForm = !this.isLoginForm;
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}

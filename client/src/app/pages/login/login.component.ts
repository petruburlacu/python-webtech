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
  isAuth = false;
  accountDetails = null;
  accountEmail = '';
  accountName = '';
  accountToken = '';
  isAccountVisible = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private notification: NzNotificationService) { }


  ngOnInit() {
    this.initializeForms();
    this.isAuth = this.authService.checkAuthentication();
  }

  submitLoginForm(input): void {
    this.isLoading = true;
    console.log(input);
    this.authService.accountLogin(input).subscribe((response) => {
      this.isAuth = response.status;
      if (this.isAuth) {
        this.createNotification('success', 'Session', 'Account authenticated');
        this.accountDetails = response.data;
        this.authService.setAuthenticationStatus(response.status, this.accountDetails);
      } else {
        this.createNotification('warning', 'Session', response.message);
      }
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.createNotification('error', 'Request failed', 'Could not authenticate');
      this.isLoading = false;
    });
  }

  submitRegisterForm(input): void {
    this.isLoading = true;
    console.log(input);
    this.authService.accountRegister(input).subscribe((response) => {
      if (response.status) {
        this.createNotification('success', 'Registration', 'Account created successfuly!');
        this.isLoginForm = true;
      } else {
        this.createNotification('error', 'Request failed', 'Could not register the account');
      }
      this.isLoginForm = true;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.createNotification('error', 'Request failed', error);
      this.isLoading = false;
      this.isLoginForm = true;
    });
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  getAccountInfo(): void {
    this.isAccountVisible = true;
    this.accountDetails = this.authService.getAccountDetails();
    this.accountEmail = this.accountDetails.email;
    this.accountName = this.accountDetails.name;
    this.accountToken = this.accountDetails.token;
  }

  switchAuthentication(): void {
    this.isLoginForm = !this.isLoginForm;
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
}

/** Ant Design Modules */
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

/** Config Angular i18n */
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** Angular Modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAuthComponent } from './shared/components/form-auth/form-auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RestrictedComponent } from './pages/restricted/restricted.component';
import { HomeComponent } from './pages/home/home.component';
import { ThreatsComponent } from './pages/threats/threats.component';

@NgModule({
  declarations: [
    AppComponent,
    FormAuthComponent,
    LoginComponent,
    RestrictedComponent,
    HomeComponent,
    ThreatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgZorroAntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

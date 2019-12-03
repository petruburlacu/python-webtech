import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictedComponent } from './pages/restricted/restricted.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ThreatsComponent } from './pages/threats/threats.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'threats', component: ThreatsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: RestrictedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictedComponent } from './pages/restricted/restricted.component';
import { LoginComponent } from './pages/login/login.component';
import { ThemeComponent } from './pages/theme/theme.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'theme', component: ThemeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: RestrictedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

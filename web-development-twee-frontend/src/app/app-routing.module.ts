import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HistoryComponent } from './components/history/history.component';
import { SellComponent } from './components/sell/sell.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'sell', component: SellComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/global/navigation/navigation.component';
import { HistoryComponent } from './components/history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentPopupComponent } from './components/global/payment-popup/payment-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SellComponent } from './components/sell/sell.component';
import { SellPopupComponent } from './components/global/sell-popup/sell-popup.component';
import { ErrorComponent } from './components/global/error/error.component';
import { CategoryPopupComponent } from './components/global/category-popup/category-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    HistoryComponent,
    PaymentPopupComponent,
    SellComponent,
    SellPopupComponent,
    ErrorComponent,
    CategoryPopupComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

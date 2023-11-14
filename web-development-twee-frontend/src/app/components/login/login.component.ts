import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ErrorComponent } from '../global/error/error.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email:string= '';
    password:string= '';

    constructor(private authenticationService: AuthenticationService, private router: Router, private dialog: MatDialog, ) { }

    login() {
        this.authenticationService.login(this.email, this.password).subscribe(
          token => {
            console.log('Login successful! Token:', token);
            this.router.navigate(['/categories']);
          },
          error => {
            this.dialog.open(ErrorComponent);
          }
        );
    }
}

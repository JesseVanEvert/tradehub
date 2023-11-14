import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ErrorComponent } from '../global/error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  name:string= '';
  email:string= '';
  password:string= '';

  constructor(private authenticationService: AuthenticationService, private dialog: MatDialog, private router:Router) { }

  register() {
      var data = this.authenticationService.register(this.name, this.email, this.password);

      let dialog = this.dialog;
      let router = this.router;

      data.subscribe({
        next(x: any) { console.log('got value ' + x); },
        error(err: any) { dialog.open(ErrorComponent); },
        complete() { router.navigate(['']);  }});
  }
}

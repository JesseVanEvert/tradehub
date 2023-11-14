import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  history() {
    this.router.navigate(['/history']);
  }

  categories() {
    this.router.navigate(['/categories']);
  }

  sell() {
    this.router.navigate(['/sell']);
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: () => {},
      error: err => console.log(err),
      complete: () => this.router.navigate(['/login'])
    });
  } 
}

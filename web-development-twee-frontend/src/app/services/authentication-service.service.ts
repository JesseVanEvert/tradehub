import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  private isAuthenticatedFlag: boolean = false;

  private url = 'http://127.0.0.1:8000/api'

  /*login(email: string, password: string) {

    this.http.post<any>(this.url + `/login?email=${email}&password=${password}`, null)
      .subscribe({
        next(x) { 
          localStorage.clear();
          localStorage.setItem('token', x.authorisation.token); 
          localStorage.setItem('userId', x.user.id);
        },
        error(err) { console.log(err); }, 
        complete() { console.log('done');}
      });
  }*/

    login(email: string, password: string): Observable<string> {
    const loginData = { email, password };

    return this.http.post<any>(`${this.url}/login`, loginData).pipe(
      map(response => {
        if (response && response.authorisation.token) {
          const token = response.authorisation.token;
          this.saveToken(token);
          this.saveUserId(response.user.id);
          return token;
        }
        throw new Error('Token not found in response.');
      })
    );
  }

  register(name: string, email: string, password: string) {
    var data = this.http.post<any>(this.url + '/register', {name: name, email: email, password: password});
    return data;
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token); 
  }

  private saveUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  logout() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    localStorage.clear();
    
    var data = this.http.post<any>(this.url + '/logout', headers);
    return data;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  private url = 'http://127.0.0.1:8000/api'

  getAllCategories() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    console.log(localStorage.getItem('token'));

    var data = this.http.get<any>(`${this.url}/showAllCategories`, { headers } );
    return data;
  }

  getProductsByCategory(categoryId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    var data = this.http.get<any>(`${this.url}/showProductsByCategory/${categoryId}`, { headers } );
    return data;
  }

  storeCategory(category: Category) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    var data = this.http.post<any>(`${this.url}/storeCategory`, category, { headers } );
    return data;
  }
}

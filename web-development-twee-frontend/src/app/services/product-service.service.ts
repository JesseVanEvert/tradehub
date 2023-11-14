import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuyProduct } from '../interfaces/buy-product';
import { SellProduct } from '../interfaces/sell-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private url = 'http://127.0.0.1:8000/api';

  getSoldProductsByUserId() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    
    console.log(localStorage.getItem('userId'));

    var data = this.http.get<any>(`${this.url}/showSoldProductsHistory/${localStorage.getItem('userId')}`, { headers } );
    return data;
  }

  buyProduct(buyProduct: BuyProduct) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    var data = this.http.post<any>(`${this.url}/buyProduct`, buyProduct, { headers } );
    return data;
  }

  storeProduct(product: SellProduct) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    var data = this.http.post<any>(`${this.url}/storeProduct`, product, { headers } );
    return data;
  }

  getAllProducts() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    var data = this.http.get<any>(`${this.url}/showAllProducts`, { headers } );
    return data;
  }
}

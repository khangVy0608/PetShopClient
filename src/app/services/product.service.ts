import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:5000";

  constructor(private http : HttpClient) { }


  getProducts(){
    let api = `${this.url}/api/v1/products`;
    return this.http.get<any>(api);
  }

  getProductsById(productId : any){
    let api = `${this.url}/api/v1/products/${productId}`;
    return this.http.get<any>(api);
  }

  addProduct(form : any){
    let api = `${this.url}/api/v1/products`;
    return this.http.post<any>(api, form);
  }

  updateProduct(form : any){
    let api = `${this.url}/api/v1/products`;
    return this.http.put<any>(api, form);
  }

  deleteProduct(id : any){
    let api = `${this.url}/api/v1/products/${id}`;
    return this.http.delete<any>(api);
  }

  addFavorite(id : any){
    let api = `${this.url}/api/v1/favorite`;
    return this.http.post<any>(api, id);
  }

  deleteFavorite(id : any){
    let api = `${this.url}/api/v1/favorite`;
    return this.http.delete<any>(api, id);
  }

}

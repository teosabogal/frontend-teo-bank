import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { ProductModel } from "../models/ProductModel";

const URL = environment.url;

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  infoLogin: any[] = [];

  constructor(private http: HttpClient) {}

  /* Guardar información del producto en la BD */

  createProduct(p: ProductModel) {
    return this.http.post(`${URL}/bp/products`, p);
  }

  /* Fin */

  /* Guardar información del producto en la BD */

  updateProduct(p: ProductModel) {
    return this.http.put(`${URL}/bp/products/${p.id}`, p);
  }

  /* Fin */

  deleteProduct(p: ProductModel) {
    return this.http.delete(`${URL}/bp/products/${p.id}`);
  }

  checkProductId(id: string) {
    return this.http.get<boolean>(`${URL}/bp/products/verification/${id}`);
  }

  /* Traer los productos */

  getProducts() {
    return this.http.get(`${URL}/bp/products`);
  }

  /* Fin */
}

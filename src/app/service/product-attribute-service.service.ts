import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductAttributes } from '../model/product-attributes';
@Injectable({
  providedIn: 'root'
})
export class ProductAttributeServiceService {
  apiUrl: string = "http://localhost:9090/ingestion";

  constructor(private http: HttpClient) {
  }
  addProductAttributeIngestion(productAttributes:ProductAttributes) {
    console.log("data from:"+JSON.stringify(productAttributes));
        console.log("att from:"+JSON.stringify(productAttributes.attributesPair.get("visibilty")));

    return this.http.post(this.apiUrl+"/productattributes/", productAttributes);
  }
}
import { Injectable, EventEmitter, Output, } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Attributes } from '../model/attributes';

@Injectable({
  providedIn: 'root'
})
export class AttributeDataService {

  private visibilityShareData = new BehaviorSubject<Attributes[]>(null);

  private tradingShareData = new BehaviorSubject<Attributes[]>(null);

  private shippingShareData = new BehaviorSubject<Attributes[]>(null);

  private logosticsShareData = new BehaviorSubject<Attributes[]>(null);
  private imagesShareData = new BehaviorSubject<Attributes[]>(null);



  constructor() { }

  setVisibleAttributeValues(arrayvalues: Attributes[]) {
    this.visibilityShareData.next(arrayvalues)
    console.log("calling from visble" + JSON.stringify(this.visibilityShareData));

  }
  getVisibleAttributeValues(): Observable<Attributes[]> {
    return this.visibilityShareData.asObservable();

  }

  setTradingAttributeValues(arrayvalues: Attributes[]) {
    this.tradingShareData.next(arrayvalues)
    console.log("calling from trading" + JSON.stringify(this.tradingShareData));

  }
  getTradingAttributeValues(): Observable<Attributes[]> {
    return this.tradingShareData.asObservable();
  }
  setShippingAttributeValues(arrayvalues: Attributes[]) {
    this.shippingShareData.next(arrayvalues)
    console.log("calling from shipping" + JSON.stringify(this.shippingShareData));

  }
  getShippingAttributeValues(): Observable<Attributes[]> {
    return this.shippingShareData.asObservable();
  }
  setLogosticsAttributeValues(arrayvalues: Attributes[]) {
    this.logosticsShareData.next(arrayvalues)
    console.log("calling from logostics" + JSON.stringify(this.logosticsShareData));

  }
  getLogosticsAttributeValues(): Observable<Attributes[]> {
    return this.logosticsShareData.asObservable();
  }
  setImagesAttributeValues(arrayvalues: Attributes[]) {
    this.imagesShareData.next(arrayvalues)
    console.log("calling from images" + JSON.stringify(this.imagesShareData));

  }
  getImagesAttributeValues(): Observable<Attributes[]> {
    return this.imagesShareData.asObservable();
  }



}

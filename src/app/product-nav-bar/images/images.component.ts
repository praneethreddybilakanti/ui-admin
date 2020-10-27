import { Component, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi } from 'ag-grid';
import { ProductAttributes } from 'src/app/model/product-attributes';

import { Attributes } from 'src/app/model/attributes'
import { ActionbuttonsComponent } from 'src/app/components/actionbuttons/actionbuttons.component';
import { EventEmitter } from '@angular/core';
import { ButtonRenderComponent } from 'src/app/components/button-render/button-render.component';
import { Output } from '@angular/core';
import { ProductAttributeServiceService } from 'src/app/service/product-attribute-service.service';
import { Router } from '@angular/router';
import { AttributeDataService } from 'src/app/shared/attributedata.service';
import { JsonPipe } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  private api: GridApi;
  private columnApi: ColumnApi;
  private attriburesList: Attributes[];
  private id: number;
  private category: String;
  private subCategory: String;
  frameworkComponents: any;
  productAttributes: Attributes;
  $visibilty = new EventEmitter();
  attributeMap = new Map();
  dataAttributesTrading: Attributes[] = [];

  dataAttributesLogostics: Attributes[] = [];

  dataAttributesVisbilty: Attributes[] = [];

  dataAttributesShipping: Attributes[] = [];

  public imagesAttributeList: Attributes[] = [];
  columnDefs = [

    {
      headerName:"value", field: 'value', sortable: true, filter: true, editable: true, resizable: true
     },
     { headerName:"priority",field: 'priority', sortable: true, filter: true, editable: true, resizable: true },
     { headerName:"order",field: 'ordervalue', sortable: true, filter: true, editable: true, resizable: true },
     {
       headerName:"defaultvalue",field: 'defaultvalue', sortable: true, filter: true, editable: true, resizable: true
     },

    {
      headerName: "add",
      cellRendererFramework: ActionbuttonsComponent,
      colId: "edit",
      resizable: true,
      maxWidth: 70,
      minWidth: 20
    },

    {
      headerName: 'Delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteButtonClick.bind(this),
        label: 'Delete',
        maxWidth: 10,
        minWidth: 5
      }

    }
  ];




  rowData = [];
  constructor(
    private router: Router,
    private productAttributeServiceService: ProductAttributeServiceService,
    private attributeDataService: AttributeDataService,    private storage: LocalStorageService


  ) {


  }
  ngOnInit() {

    this.frameworkComponents = {
      buttonRenderer: ButtonRenderComponent
    },
      this.attributeDataService.getVisibleAttributeValues().subscribe(data => {
        console.log("visible" + data);
        this.dataAttributesVisbilty = data;
      });
    this.attributeDataService.getTradingAttributeValues().subscribe(data => {
      console.log("trading" + data);

      this.dataAttributesTrading = data;
    });

    this.attributeDataService.getLogosticsAttributeValues().subscribe(data => {
      this.dataAttributesLogostics = data;
      console.log("lgostics" + data);

    });
    this.attributeDataService.getShippingAttributeValues().subscribe(data => {
      console.log("shipping" + data);

      this.dataAttributesShipping = data;
    });
    console.log("visibilty" + JSON.stringify(this.dataAttributesVisbilty))
    console.log("trading" + JSON.stringify(this.dataAttributesTrading))
    console.log("lgostics" + JSON.stringify(this.dataAttributesLogostics))
    console.log("shipping" + JSON.stringify(this.dataAttributesShipping))

  }





  insertNewResult() {
    // insert a blank new row, providing the first 
    const row = new Attributes();

    const updates = this.api.updateRowData(
      {
        add: [{
          row
        }]
      }
    );
  }


  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;

    this.api.sizeColumnsToFit();
    this.rowData=this.storage.retrieve("images");

    // temp fix until AG-1181 is fixed
    this.api.hideOverlay();
  }



  saveAttributes() {
    const productAttributeFinalObject = new ProductAttributes();
    productAttributeFinalObject.productSubCategoryName = "mobiles";
    productAttributeFinalObject.productCategoryName = "electronics";
    productAttributeFinalObject.createdBy = "praneeth";
    productAttributeFinalObject.attributesPair = new Map();
    this.api.forEachNode((node) => {
      const { data } = node;
      this.imagesAttributeList.push(<Attributes>{
        value: data.value,
        priority: data.priority,
        ordervalue: data.ordervalue,
        defaultvalue: data.defaultvalue
      });

      // productAttributeFinalObject.attributesPair.set("visibilty", this.dataAttributesVisbilty);


    });
    console.log("images attributes:" + JSON.stringify(this.imagesAttributeList))

    productAttributeFinalObject.attributesPair.set("images", this.imagesAttributeList);
    productAttributeFinalObject.attributesPair.set("Trading", this.dataAttributesTrading);
    productAttributeFinalObject.attributesPair.set("logestics", this.dataAttributesLogostics);
    productAttributeFinalObject.attributesPair.set("shipping", this.dataAttributesShipping);
    productAttributeFinalObject.attributesPair.set("visibilty", this.dataAttributesVisbilty);

    console.log("after:" + JSON.stringify(productAttributeFinalObject.attributesPair.get("images")));
    this.productAttributeServiceService.addProductAttributeIngestion(productAttributeFinalObject);
    console.log("map" + JSON.stringify(productAttributeFinalObject.attributesPair))
    console.log("after:" + JSON.stringify(productAttributeFinalObject.attributesPair.get("shipping")));
    console.log("after:" + JSON.stringify(productAttributeFinalObject.attributesPair.get("Trading")));
    console.log("after:" + JSON.stringify(productAttributeFinalObject.attributesPair.get("logestics")));
    console.log("after:" + JSON.stringify(productAttributeFinalObject.attributesPair.get("visibilty")));

    this.storage.store("images", this.imagesAttributeList);
    console.log("local:");


  }


  
  onDeleteButtonClick(params) {
    this.api.updateRowData({ remove: [params.data] });
    this.storage.clear();

  }
}


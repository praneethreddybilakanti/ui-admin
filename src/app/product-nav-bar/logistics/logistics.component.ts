import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {ColDef, ColumnApi, GridApi} from 'ag-grid';
import {ProductAttributes} from 'src/app/model/product-attributes';

import { Attributes} from 'src/app/model/attributes'
import { ProductAttributeServiceService } from 'src/app/service/product-attribute-service.service';
import { Router } from '@angular/router';
import { AttributeDataService } from 'src/app/shared/attributedata.service';
import { EventEmitter } from '@angular/core';
import { ButtonRenderComponent } from 'src/app/components/button-render/button-render.component';
import { Output } from '@angular/core';
import { ActionbuttonsComponent } from 'src/app/components/actionbuttons/actionbuttons.component';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent implements OnInit {
  private api: GridApi;
  private columnApi: ColumnApi;
private attriburesList:Attributes[];
private id:number;
private category:String;
private subCategory:String;
  frameworkComponents: any;
  productAttributes: Attributes;
  $visibilty = new EventEmitter();

  ngOnInit() {
    //this.subCategory = "mobiles";

    this.frameworkComponents = {
      buttonRenderer: ButtonRenderComponent
    },
    this.attributeDataService.setLogosticsAttributeValues(this.logosticsAttributeList)
  }
  public logosticsAttributeList:Attributes[]=[];

  constructor(
    private router: Router,
    private productAttributeServiceService: ProductAttributeServiceService,
    private attributeDataService: AttributeDataService

  ) {
  }

  columnDefs = [

    {
      field: 'value', sortable: true, filter: true, editable: true, resizable: true
    },
    { field: 'priority', sortable: true, filter: true, editable: true, resizable: true },
    { field: 'order', sortable: true, filter: true, editable: true, resizable: true },
    {
      field: 'defaultvalue', sortable: true, filter: true, editable: true, resizable: true
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
  insertNewResult() {
    // insert a blank new row, providing the first sport as a default in the sport column

    const row = new Attributes();

    const updates = this.api.updateRowData(
      {
        add: [{
          row
        }]
      }
    );
  }

  /*
this.api.startEditingCell({
    rowIndex: updates.add[0].rowIndex,
    colKey:"defaultValue"
   
});
console.log(":::::::::::::::::"+updates);

}
*/
  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;

    this.api.sizeColumnsToFit();

    // temp fix until AG-1181 is fixed
    this.api.hideOverlay();
  }
  saveAttributes() {
    /*const productAttributes = new ProductAttributes();
    //productAttributes.id=this.id;
    productAttributes.productCategoryName = this.category;
    productAttributes.productSubCategoryName = this.subCategory;
    productAttributes.attributesPair = new Map();
*/
    this.api.forEachNode((node) => {
      const { data } = node;
      this.logosticsAttributeList.push(<Attributes>{
        value: data.value,
        priority: data.priority,
        ordervalue: data.ordervalue,
        defaultvalue: data.defaultvalue
      });
      this.rowData.push(this.logosticsAttributeList);
      this.attributeDataService.setLogosticsAttributeValues(this.logosticsAttributeList);
      console.log("data from logosticsAttributeList:"+JSON.stringify(this.logosticsAttributeList));

    });
    /*
    productAttributes.attributesPair.set("logostics", this.logosticsAttributeList);

    const abc = this.productAttributeServiceService.addProductAttributeIngestion(productAttributes).subscribe(data => {
      alert("data saved ");
      console.log("data" + data);
    });
    console.log("abc" + abc);

    console.log("list:" + this.logosticsAttributeList.values)
    const a = productAttributes.attributesPair.get("logostics");
    console.log(a[0].value);
    console.log(a[1].value);
    console.log(a[2].value);

*/
  }


  /*
  onDeleteRow()
   {
  var selectedData = this.api.getSelectedRows();
  this.api.updateRowData({ remove: selectedData });
 // console.log("delete"+selectedData[0].value)
}

onEditButtonClick(params)
{
 this.api.startEditingCell({
    rowIndex: params.rowIndex,
    colKey: 'make'
  });
}

onSaveButtonClick(params)
{
 this.api.stopEditing();
}
*/
  onDeleteButtonClick(params) {
    debugger;
    this.api.updateRowData({ remove: [params.data] });
  }
}
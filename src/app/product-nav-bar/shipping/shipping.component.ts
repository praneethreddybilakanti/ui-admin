import { Component, OnInit,Output} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {ColDef, ColumnApi, GridApi} from 'ag-grid';
import {ProductAttributes} from 'src/app/model/product-attributes';

import { Attributes} from 'src/app/model/attributes'
import { ButtonRenderComponent } from 'src/app/components/button-render/button-render.component';
import { ActionbuttonsComponent } from 'src/app/components/actionbuttons/actionbuttons.component';
import { AttributeDataService } from 'src/app/shared/attributedata.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  private api: GridApi;
  private columnApi: ColumnApi;
private attriburesList:Attributes[];
private id:number;
private category:String;
private subCategory:String;
  productAttributeServiceService: any;
  frameworkComponents: any;
  rowData = [];

  @Output()
  shippingAttributeList:Attributes[]=[];


ngOnInit() {
   
  this.frameworkComponents = {
    buttonRenderer: ButtonRenderComponent
  },
  this.attributeDataService.setShippingAttributeValues(this.shippingAttributeList);
}
constructor(private attributeDataService:AttributeDataService,    private storage: LocalStorageService
  )
{
}

columnDefs = [

  {
    headerName:"value", field: 'value', sortable: true, filter: true, editable: true, resizable: true
   },
   { headerName:"priority",field: 'priority', sortable: true, filter: true, editable: true, resizable: true },
   { headerName:"order",field: 'ordervalue', sortable: true, filter: true, editable: true, resizable: true },
   {
     headerName:"defaultvalue",field: 'defaultvalue', sortable: true, filter: true, editable: true, resizable: true
   }, {
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
  this.rowData=this.storage.retrieve("shipping");

  // temp fix until AG-1181 is fixed
  this.api.hideOverlay();
}
saveAttributes() {
  //const productAttributes = new ProductAttributes();
  //productAttributes.id=this.id;
  //productAttributes.productCategoryName = this.category;
  //productAttributes.productSubCategoryName = this.subCategory;
  //productAttributes.attributesPair = new Map();

  this.api.forEachNode((node) => {
    const { data } = node;
    this.shippingAttributeList.push(<Attributes>{
      value: data.value,
      priority: data.priority,
      ordervalue: data.ordervalue,
      defaultvalue: data.defaultvalue
    });
   // this.attributeDataService.setShippingAttributeValues(this.shippingAttributeList);
    console.log("data from shippingAttributeList:"+JSON.stringify(this.shippingAttributeList));
    
  });
  this.storage.store("shipping", this.shippingAttributeList);
  console.log("local:");


}

onDeleteButtonClick(params) {
  this.api.updateRowData({ remove: [params.data] });
  this.storage.clear();

}
}
import { Component, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {ColDef, ColumnApi, GridApi} from 'ag-grid';
import {ProductAttributes} from 'src/app/model/product-attributes';

import { Attributes} from 'src/app/model/attributes'
import { VisibilityComponent } from '../visibility/visibility.component';
import { AttributeDataService } from 'src/app/shared/attributedata.service';
import { ButtonRenderComponent } from 'src/app/components/button-render/button-render.component';
import { ActionbuttonsComponent } from 'src/app/components/actionbuttons/actionbuttons.component';
import { Output } from '@angular/core';
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {

  private api: GridApi;
  private columnApi: ColumnApi;
//private attriburesList:Attributes[];
private id:number;
private category:String;
private subCategory:String;
  productAttributeServiceService: any;
  visibiltyArray:any;
  visibityservice: any;
  frameworkComponents: any;
  trading: any;
  @Output() public  tradingAttributeList: Attributes[]=[];


 constructor(private attributeDataService:AttributeDataService)
{
  console.log("constructer")
}

//@Input()
ngOnInit() {
  /*
  console.log("values frpm serice")
  this.attributeDataService.$dataAttributesvisibilty.subscribe(data =>
    {
      console.log("data trading "+data[0].value);
    });
    */
    
    this.frameworkComponents = {
      buttonRenderer: ButtonRenderComponent
    },
    this.attributeDataService.setTradingAttributeValues(this.tradingAttributeList);
  }

columnDefs = [

  {field: 'value',sortable:true,filter:true , editable: true
},
  { field: 'priority',sortable:true,filter:true,editable: true},
  { field: 'order',sortable:true,filter:true,editable: true },
  { field: 'defaultvalue',sortable:true,filter:true,editable: true },
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
console.log("praneeth")
  this.api.forEachNode((node) => {
    const { data } = node;
    this.tradingAttributeList.push(<Attributes>{
      value: data.value,
      priority: data.priority,
      ordervalue: data.ordervalue,
      defaultvalue: data.defaultvalue
    });
    //this.rowData.push(this.tradingAttributeList);

  });
  //console.log("array:"+this.tradingAttributeList[0].value)
  //productAttributes.attributesPair.set("trading", this.tradingAttributeList);
  //this.attributeDataService.setTradingAttributeValues(this.tradingAttributeList);
  console.log("data from trading:"+JSON.stringify(this.tradingAttributeList));

/*
  const abc = this.productAttributeServiceService.addProductAttributeIngestion(productAttributes).subscribe(data => {
    alert("data saved ");
    //console.log("data" + data);
  });
  //console.log("abc" + abc);
*/
 // console.log("list:" + this.tradingAttributeList.values)

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
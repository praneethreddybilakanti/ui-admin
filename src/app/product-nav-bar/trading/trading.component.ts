import { Component, Input, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi } from 'ag-grid';
import { ProductAttributes } from 'src/app/model/product-attributes';

import { Attributes } from 'src/app/model/attributes'
import { VisibilityComponent } from '../visibility/visibility.component';
import { AttributeDataService } from 'src/app/shared/attributedata.service';
import { ButtonRenderComponent } from 'src/app/components/button-render/button-render.component';
import { ActionbuttonsComponent } from 'src/app/components/actionbuttons/actionbuttons.component';
import { Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {

  private api: GridApi;
  private columnApi: ColumnApi;
  //private attriburesList:Attributes[];
  private id: number;
  private category: String;
  private subCategory: String;
  productAttributeServiceService: any;
  visibiltyArray: any;
  visibityservice: any;
  frameworkComponents: any;
  trading: any;
  @Output() 
  public tradingAttributeList: Attributes[] = [];


  constructor(private attributeDataService: AttributeDataService, private storage: LocalStorageService
  ) {
    console.log("constructer")
  }

  ngOnInit() {

    this.frameworkComponents = {
      buttonRenderer: ButtonRenderComponent
    },
      this.attributeDataService.setTradingAttributeValues(this.tradingAttributeList);
  }

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

  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;

    this.api.sizeColumnsToFit();
    this.rowData=this.storage.retrieve("trading");

    // temp fix until AG-1181 is fixed
    this.api.hideOverlay();
  }
  saveAttributes() {

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
    this.storage.store("trading", this.tradingAttributeList);
    console.log("local:");


  }


  
  onDeleteButtonClick(params) {
    this.api.updateRowData({ remove: [params.data] });
    this.storage.clear(params.data);

  }
}
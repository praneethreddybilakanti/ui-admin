import { Attribute, Component, OnInit, EventEmitter } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, RowNodeTransaction } from 'ag-grid';
import { ProductAttributes } from 'src/app/model/product-attributes';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAttributeServiceService } from 'src/app/service/product-attribute-service.service';
import { Attributes } from 'src/app/model/attributes';
import { ActionbuttonsComponent } from 'src/app/components/actionbuttons/actionbuttons.component';
import { ButtonRenderComponent } from 'src/app/components/button-render/button-render.component';
import { AttributeDataService } from 'src/app/shared/attributedata.service';
import { Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.css']
})
export class VisibilityComponent implements OnInit {
  private api: GridApi;
  private columnApi: ColumnApi;
  private attriburesList: Attributes[];
  private id: number;
  private category: String;
  private subCategory: String;
  frameworkComponents: any;
  // $visibilty = new EventEmitter();
  public visibilityAttributeList: Attributes[] = [];

  ngOnInit() {

    this.frameworkComponents = {
      buttonRenderer: ButtonRenderComponent
    },
      this.attributeDataService.setVisibleAttributeValues(this.visibilityAttributeList);
  }
  constructor(
    private router: Router,
    private attributeDataService: AttributeDataService,
    private storage: LocalStorageService

  ) {
  }

  columnDefs = [

    {
      headerName: "value", field: 'value', sortable: true, filter: true, editable: true, resizable: true
    },
    { headerName: "priority", field: 'priority', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: "order", field: 'ordervalue', sortable: true, filter: true, editable: true, resizable: true },
    {
      headerName: "defaultvalue", field: 'defaultvalue', sortable: true, filter: true, editable: true, resizable: true
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
    this.api.updateRowData(
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
    this.columnApi = params.columnApiretrieve

    this.api.sizeColumnsToFit();
    this.rowData = this.storage.retrieve("visibility");
    // temp fix until AG-1181 is fixed
    this.api.hideOverlay();
  }
  saveAttributes() {
    // const productAttributes = new ProductAttributes();
    //productAttributes.id=this.id;
    //productAttributes.productCategoryName = this.category;
    //productAttributes.productSubCategoryName = this.subCategory;
    // productAttributes.attributesPair = new Map();
    this.api.forEachNode((node) => {
      const { data } = node;
      this.visibilityAttributeList.push(<Attributes>{
        value: data.value,
        priority: data.priority,
        ordervalue: data.ordervalue,
        defaultvalue: data.defaultvalue
      });
      //this.rowData.push(this.tradingAttributeList);

    });

    this.storage.store("visibility", this.visibilityAttributeList);
    console.log("local:");
console.log("visible data"+JSON.stringify(this.visibilityAttributeList))

  }



  onDeleteButtonClick(params) {

    this.api.updateRowData({ remove: [params.data] }
      );    

    console.log("selected data" + params.data.values)
    this.storage.clear(params.data)

    console.log("remove.....................................")
  }
}
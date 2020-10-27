import { Component, OnInit, ViewChild, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { Attributes } from 'src/app/model/attributes';
import { AgGridAngular } from "ag-grid-angular";
import { LocalStorageService } from 'ngx-webstorage';
import { VisibilityComponent } from 'src/app/product-nav-bar/visibility/visibility.component';

@Component({
  selector: 'app-actionbuttons',
  templateUrl: './actionbuttons.component.html',
  styleUrls: ['./actionbuttons.component.css']
})
export class ActionbuttonsComponent implements ICellRendererAngularComp {
  public params: any;
disablefunction=true;
  constructor(    private storage: LocalStorageService
    ) { }
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
  }

  public invokeDeleteMethod() {

    var selectedData = this.params.api.getSelectedRows();
    this.params.api.updateRowData({remove: selectedData});
   
  }
  
  public invokeAddButton() {
    const row = new Attributes();
   this.params.api.updateRowData({
      add: [{
        row
      }]
    }
    );
    
if(row==null)
{
this.disablefunction=false;   

}
//console.log("row value"+valuesfromrow.values)
 
   
  }
}

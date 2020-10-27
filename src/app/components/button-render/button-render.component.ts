import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-render',
  templateUrl: './button-render.component.html',
  styleUrls: ['./button-render.component.css']
})
export class ButtonRenderComponent implements OnInit,ICellRendererAngularComp{

  constructor() { }

  ngOnInit(): void {
  }
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(this.params);

    }
  }
}

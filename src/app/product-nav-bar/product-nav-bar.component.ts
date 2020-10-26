import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {

  isDeactive: boolean;
  constructor() {
    this.isDeactive = false;
  }
  
  toggleDisable() {
    if(this.isDeactive) {
      this.isDeactive = false;
    }else {
      this.isDeactive = true;
    }
  }


  ngOnInit(): void {
  }
  
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  actives=false;
  priorities=[1,2,3,4];
  category = ['electranics', 'clothing'];
  sub_category=["mobiles"];
 
  constructor() { }

  ngOnInit(): void {
  }
  onchanges(e){
    console.log(e);
    if(e=="Choose..."){
      this.actives=false;
    }else{
    this.actives=true;
  }
  }
}

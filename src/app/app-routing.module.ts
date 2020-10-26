import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './product-nav-bar/images/images.component';
import { LogisticsComponent } from './product-nav-bar/logistics/logistics.component';
import { ShippingComponent } from './product-nav-bar/shipping/shipping.component';
import { TradingComponent } from './product-nav-bar/trading/trading.component';
import { VisibilityComponent } from './product-nav-bar/visibility/visibility.component';

const routes: Routes = [
  {
    path:"visiblity", component:VisibilityComponent
  },
  {
    path:"trading", component:TradingComponent

  },
{
  path:"shipping", component:ShippingComponent
 
},
{
  path:"logistics", component:LogisticsComponent
 
},
{
  path:"images", component:ImagesComponent
 
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

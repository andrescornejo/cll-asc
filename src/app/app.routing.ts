import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientListComponent } from './components/client-mgmt/client-list/client-list.component';
import { ClientOrderDetailsComponent } from './components/client-mgmt/client-order-details/client-order-details.component';
import { ClientAddComponent } from './components/client-mgmt/client-add/client-add.component';
import { ClientUpdateComponent } from './components/client-mgmt/client-update/client-update.component'
import { OrderListComponent } from './components/order-mgmt/order-list/order-list.component';
import { OrderUpdateComponent} from './components/order-mgmt/order-update/order-update.component';
import { ProductPanelComponent } from './components/order-mgmt/product-panel/product-panel.component';

const DEFAULT_API_PATH = {path: '', pathMatch: 'full', redirectTo: 'api'};

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: DashboardComponent},
  {path: 'client', component: ClientListComponent},
  {path: 'client/order-details/:nickname', component: ClientOrderDetailsComponent},
  {path: 'client/add', component: ClientAddComponent},
  {path: 'client/update/:nickname', component: ClientUpdateComponent},
  {path: 'order', component: OrderListComponent},
  {path: 'order/update/:nickname/:tracking_number', component: OrderUpdateComponent},
  {path: 'order/products/:nickname/:tracking_number', component: ProductPanelComponent},
  { path: '**', redirectTo: 'home' }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {useHash: true});

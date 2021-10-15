import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderListComponent } from './components/order-mgmt/order-list/order-list.component';
import { ClientListComponent } from './components/client-mgmt/client-list/client-list.component';
import { ClientAddComponent } from './components/client-mgmt/client-add/client-add.component';
import { ModalComponentComponent } from './components/ui-element/modal-component/modal-component.component';
import { ClientUpdateComponent } from './components/client-mgmt/client-update/client-update.component';
import { ClientOrderDetailsComponent } from './components/client-mgmt/client-order-details/client-order-details.component';
import { OrderUpdateComponent } from './components/order-mgmt/order-update/order-update.component';
import { ProductPanelComponent } from './components/order-mgmt/product-panel/product-panel.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DashboardComponent, OrderListComponent, ClientListComponent, ClientAddComponent,ModalComponentComponent, ClientUpdateComponent, ClientOrderDetailsComponent, OrderUpdateComponent, ProductPanelComponent],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EnterVehicleComponent } from './enter-vehicle/enter-vehicle.component';
import { AppRoutingModule } from './app-routing.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { TakeOutVehicleComponent } from './take-out-vehicle/take-out-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterVehicleComponent,
    VehiclesComponent,
    TakeOutVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

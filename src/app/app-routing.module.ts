import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterVehicleComponent } from './enter-vehicle/enter-vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'enter-vehicle', component: EnterVehicleComponent },
  { path: 'vehicles', component: VehiclesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
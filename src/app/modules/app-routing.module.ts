import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterVehicleComponent } from '../core/enter-vehicle/enter-vehicle.component';
import { VehiclesComponent } from '../core/vehicles/vehicles.component';
import { TakeOutVehicleComponent } from '../core/take-out-vehicle/take-out-vehicle.component';
import { NotFoundComponent } from '../core/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'enter-vehicle', component: EnterVehicleComponent, data: {animation: 'enter-vehicle'} },
  { path: 'vehicles', component: VehiclesComponent, data: {animation: 'vehicles'} },
  { path: 'take-out-vehicle', component: TakeOutVehicleComponent, data: {animation: 'take-out-vehicle'} },
  { path: 'page-not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
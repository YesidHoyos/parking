import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterVehicleComponent } from './enter-vehicle/enter-vehicle.component';

const routes: Routes = [
  { path: 'enter-vehicle', component: EnterVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
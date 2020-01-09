import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { VehicleEntered } from '../vehicle-entered';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  private vehicles: Array<VehicleEntered> = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe((response) => {
       this.vehicles = [...response.body];
    });
  }
}

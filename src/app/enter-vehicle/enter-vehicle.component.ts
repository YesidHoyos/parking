import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-enter-vehicle',
  templateUrl: './enter-vehicle.component.html',
  styleUrls: ['./enter-vehicle.component.css']
})
export class EnterVehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
  }

  enterVehicle() {
    var vehicle: Vehicle = {placa: "ABC123", cilindraje: 2500};
    this.vehicleService.enterVehicle(vehicle).subscribe((response) => {
      console.log(response);      
    })
  }

}
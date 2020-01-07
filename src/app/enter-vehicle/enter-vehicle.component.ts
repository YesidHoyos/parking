import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-enter-vehicle',
  templateUrl: './enter-vehicle.component.html',
  styleUrls: ['./enter-vehicle.component.css']
})
export class EnterVehicleComponent implements OnInit {

  vehicleForm: FormGroup;

  constructor(private vehicleService: VehicleService, private formBuilder: FormBuilder) { 
    this.vehicleForm = this.formBuilder.group({
      placa: '',
      cilindraje: '',
      tipo: ''
    })
  }

  ngOnInit() {
  }

  enterVehicle(vehicle: Vehicle) {
    console.log(vehicle);
    this.vehicleService.enterVehicle(vehicle).subscribe((response) => {
      console.log(response);      
    })
    this.vehicleForm.reset();
  }

}
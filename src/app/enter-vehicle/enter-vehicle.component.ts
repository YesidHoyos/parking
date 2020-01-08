import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { VehicleType } from '../vehicle-type';
import { VehiculeTypeValidator } from '../vehicle-type-validator';

@Component({
  selector: 'app-enter-vehicle',
  templateUrl: './enter-vehicle.component.html',
  styleUrls: ['./enter-vehicle.component.css']
})
export class EnterVehicleComponent implements OnInit {

  vehicleForm: FormGroup;
  controlFormError: boolean;

  car: VehicleType = new VehicleType(1,'Car');
  bike: VehicleType = new VehicleType(2, 'Bike');
  vehicleTypes: VehicleType[] = [this.car, this.bike]

  private commonValidators: Validators = [Validators.required];

  constructor(private vehicleService: VehicleService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      placa: ['', this.commonValidators],
      cilindraje: ['', this.commonValidators],
      tipo: ['', [Validators.required, VehiculeTypeValidator]]
    })
  }

  get vehicleFormControls() { 
    return this.vehicleForm.controls; 
  }

  enterVehicle(vehicle: Vehicle) {
    this.controlFormError = false;

    if (this.vehicleForm.invalid) {
      this.controlFormError = true;
      return;
    }
    this.vehicleService.enterVehicle(vehicle).subscribe((response) => {
      console.log(response);      
    })
    this.vehicleForm.reset();
  }

}
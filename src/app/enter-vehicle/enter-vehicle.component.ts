import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { VehicleType } from '../vehicle-type';
import { VehiculeTypeValidator } from '../vehicle-type-validator';
import { VehicleEntered } from '../vehicle-entered';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-vehicle',
  templateUrl: './enter-vehicle.component.html',
  styleUrls: ['./enter-vehicle.component.css']
})
export class EnterVehicleComponent implements OnInit {

  vehicleForm: FormGroup;
  controlFormError: boolean;
  vehicleEntered: VehicleEntered;

  car: VehicleType = new VehicleType(1,'Car');
  bike: VehicleType = new VehicleType(2, 'Bike');
  vehicleTypes: VehicleType[] = [this.car, this.bike]

  private commonValidators: Validators = [Validators.required];

  constructor(
    private vehicleService: VehicleService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

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
      this.vehicleEntered = response.body;      
    })
    this.vehicleForm.reset();
  }

  goToVehicles() {
    this.router.navigate(['vehicles'])
  }

}
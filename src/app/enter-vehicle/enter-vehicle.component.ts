import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { VehicleType } from '../vehicle-type';
import { VehiculeTypeValidator } from '../vehicle-type-validator';
import { VehicleEntered } from '../vehicle-entered';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-enter-vehicle',
  templateUrl: './enter-vehicle.component.html',
  styleUrls: ['./enter-vehicle.component.css']
})
export class EnterVehicleComponent implements OnInit {

  vehicleForm: FormGroup;
  private controlFormError: boolean;
  private vehicleEntered: VehicleEntered;
  private errorMessage: string;

  private car: VehicleType = new VehicleType(1,'Car');
  private bike: VehicleType = new VehicleType(2, 'Bike');
  private vehicleTypes: VehicleType[] = [this.car, this.bike]

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
    this.errorMessage = undefined;

    if (this.vehicleForm.invalid) {
      console.log('invalid');
      console.log(vehicle);
      
      this.controlFormError = true;
      return;
    }
    this.vehicleService.enterVehicle(vehicle)
    .pipe(
      finalize(() => {
        this.vehicleForm.reset();
      })
    ).subscribe((response) => {
      this.vehicleEntered = response.body;      
    }, (error) => {
      this.errorMessage = error.status === 0 ? 'Service Unavailable' : error.error;
    })
  }

  goToVehicles() {
    this.router.navigate(['vehicles'])
  }

}
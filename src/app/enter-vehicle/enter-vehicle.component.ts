import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { VehicleType } from '../vehicle-type';
import { VehiculeTypeValidator } from '../vehicle-type-validator';
import { VehicleEntered } from '../vehicle-entered';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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
    public dialog: MatDialog
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
      this.controlFormError = true;
      return;
    }
    this.vehicleService.enterVehicle(vehicle)
    .pipe(
      finalize(() => {
        if(this.errorMessage) {
          this.openDialog(true, this.errorMessage, null);                   
        } else {
          this.openDialog(false, null, this.vehicleEntered);
        }
      })
    ).subscribe((response) => {
      this.vehicleEntered = response.body;      
    }, (error) => {
      this.errorMessage = error.status === 0 ? 'Service Unavailable' : error.error;
    })
  }

  openDialog(error: boolean, message: string, vehicleEntered: VehicleEntered) {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: {component: 'EnterVehicleComponent', error, message, object: vehicleEntered}
    });
  }

}
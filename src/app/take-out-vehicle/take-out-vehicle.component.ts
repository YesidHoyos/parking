import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-take-out-vehicle',
  templateUrl: './take-out-vehicle.component.html',
  styleUrls: ['./take-out-vehicle.component.css']
})
export class TakeOutVehicleComponent implements OnInit {

  takeOutVehicleForm: FormGroup;
  controlFormError: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.takeOutVehicleForm = this.formBuilder.group({
      vehicleRegistration: ['', Validators.required]
    }) 
  }

  get vehicleRegistration() { 
    return this.takeOutVehicleForm.controls.vehicleRegistration; 
  }

  takeOutVehicle(vehicleRegistration: string) {
    this.controlFormError = false;

    if (this.takeOutVehicleForm.invalid) {
      this.controlFormError = true;
      return;
    }


    this.takeOutVehicleForm.reset();
  }

}

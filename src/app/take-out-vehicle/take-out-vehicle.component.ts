import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { Ticket } from '../ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-out-vehicle',
  templateUrl: './take-out-vehicle.component.html',
  styleUrls: ['./take-out-vehicle.component.css']
})
export class TakeOutVehicleComponent implements OnInit {

  takeOutVehicleForm: FormGroup;
  controlFormError: boolean;
  ticket: Ticket;

  constructor(
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.takeOutVehicleForm = this.formBuilder.group({
      vehicleRegistration: ['', Validators.required]
    }) 
  }

  get vehicleRegistration() { 
    return this.takeOutVehicleForm.controls.vehicleRegistration; 
  }

  takeOutVehicle(data) {
    this.controlFormError = false;

    if (this.takeOutVehicleForm.invalid) {
      this.controlFormError = true;
      return;
    }
    this.vehicleService.takeOutVehicle(data.vehicleRegistration).subscribe((response) => {
      this.ticket = response.body;
    })

    this.takeOutVehicleForm.reset();
  }

  goToVehicles() {
    this.router.navigate(['vehicles'])
  }

}

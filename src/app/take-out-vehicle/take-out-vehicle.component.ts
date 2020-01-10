import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { Ticket } from '../ticket';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-take-out-vehicle',
  templateUrl: './take-out-vehicle.component.html',
  styleUrls: ['./take-out-vehicle.component.css']
})
export class TakeOutVehicleComponent implements OnInit {

  takeOutVehicleForm: FormGroup;
  private controlFormError: boolean;
  private ticket: Ticket;
  private errorMessage: string;

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
    this.errorMessage = undefined;

    if (this.takeOutVehicleForm.invalid) {
      this.controlFormError = true;
      return;
    }
    this.vehicleService.takeOutVehicle(data.vehicleRegistration)
    .pipe(
      finalize(() => {
        this.takeOutVehicleForm.reset();
      })
    ).subscribe((response) => {
      this.ticket = response.body;
    }, (error) => {
      this.errorMessage = error.status === 0 ? 'Service Unavailable' : error.error;
    })
  }

  goToVehicles() {
    this.router.navigate(['vehicles'])
  }

}

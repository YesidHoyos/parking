import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { Ticket } from '../ticket';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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
    private router: Router,    
    public dialog: MatDialog
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
        if(this.errorMessage) {
          this.openDialog(true, this.errorMessage, null);                   
        } else {
          this.openDialog(false, null, this.ticket);
        }
      })
    ).subscribe((response) => {
      this.ticket = response.body;
    }, (error) => {
      this.errorMessage = error.status === 0 ? 'Service Unavailable' : error.error;
    })
  }

  openDialog(error: boolean, message: string, ticket: Ticket) {
    this.dialog.open(DialogComponent, {
      width: '450px',
      data: {component: 'TakeOutVehicleComponent', error, message, object: ticket}
    });
  }

}

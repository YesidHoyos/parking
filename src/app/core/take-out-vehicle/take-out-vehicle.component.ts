import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { Ticket } from '../../shared/models/ticket';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-take-out-vehicle',
  templateUrl: './take-out-vehicle.component.html',
  styleUrls: ['./take-out-vehicle.component.css']
})
export class TakeOutVehicleComponent implements OnInit, OnDestroy {

  takeOutVehicleForm: FormGroup;
  private controlFormError: boolean;
  private ticket: Ticket;
  private errorMessage: string;
  VehicleSubscription: Subscription;

  constructor(
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
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
    this.VehicleSubscription = this.vehicleService.takeOutVehicle(data.vehicleRegistration)
      .pipe(
        finalize(() => {
          if (this.errorMessage) {
            this.openDialog(true, this.errorMessage, null);
          } else {
            this.openDialog(false, null, this.ticket);
          }
        }))
      .subscribe((response) => {
        this.ticket = response.body;
      }, (error) => {
        this.errorMessage = error.status === 0 ? 'Service Unavailable' : error.error;
      })
  }

  openDialog(error: boolean, message: string, ticket: Ticket): void {
    this.dialog.open(DialogComponent, {
      width: '450px',
      data: { component: 'TakeOutVehicleComponent', error, message, object: ticket }
    });
  }

  ngOnDestroy() {
    if(this.VehicleSubscription !== undefined) {
      this.VehicleSubscription.unsubscribe();
    }    
  }

}

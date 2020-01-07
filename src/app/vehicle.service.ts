import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  API_URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  enterVehicle(vehicle: Vehicle){
    return this.http.post(`${this.API_URL}/vehiculos`, vehicle);
  }
}

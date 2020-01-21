import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Vehicle } from '../../shared/models/vehicle';
import { VehicleEntered } from '../../shared/models/vehicle-entered';
import { Observable } from 'rxjs';
import { Ticket } from '../../shared/models/ticket';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  API_URL: string = 'http://localhost:8080/parqueadero';

  constructor(private http: HttpClient) { }

  enterVehicle(vehicle: Vehicle): Observable<HttpResponse<VehicleEntered>> {
    return this.http.post<VehicleEntered>(`${this.API_URL}/vehiculos`, vehicle, { observe: 'response' });
  }

  getVehicles(): Observable<HttpResponse<VehicleEntered[]>> {
    return this.http.get<VehicleEntered[]>(`${this.API_URL}/vehiculos`, { observe: 'response' });
  }

  takeOutVehicle(vehicleRegistration: string): Observable<HttpResponse<Ticket>> {
    return this.http.put<Ticket>(`${this.API_URL}/vehiculos/${vehicleRegistration}`, null, { observe: 'response' });
  }
}

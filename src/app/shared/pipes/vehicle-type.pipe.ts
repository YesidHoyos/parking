import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(type: number): string {
    return type === 1 ? 'Car' : (type === 2 ? 'Bike' : null);
  }

}

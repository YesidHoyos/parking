import { AbstractControl } from '@angular/forms';

export function VehiculeTypeValidator(control: AbstractControl): { [key: string]: any } | null {
    // set error on control if validation fails
    return control.value == 1 || control.value == 2 ? null
        : { invalidType: { valid: false, value: control.value } }
}
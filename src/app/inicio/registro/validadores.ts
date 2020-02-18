import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class Validadores {

    static AnioFecha( control: AbstractControl ): ValidationErrors | null {

        // Condicion para verificar el año de la fecha, si es menor a 1900 marca un error
        
        if ( !control.value ) {
            return;
        }

        let anio = Number(control.value.split('-')[0]);
        
        // Verificamos la condicion
        if ( anio < 1900 ) {
            // Regresamos el nombre del validador
            return {
                anio_incorrecto: true
            };
        } else {
            return null;
        }
    }
}


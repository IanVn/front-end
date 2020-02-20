import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { RegistroService } from '../../servicios/registro/registro.service';
import { Observable } from 'rxjs';

export class Validadores {


    constructor( private _registro: RegistroService ) {}

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

    // ExisteCurp( control: AbstractControl ): Observable<ValidationErrors | null > {

    //     // El parametro control es la referencia del atributo del formulario
    //     // Llamamos al servicio que será el encargado de revisar si existe la curp
    //     this._registro.ExisteCurp( control.value ).pipe(
    //         map(  )
    //     )

    // }



}
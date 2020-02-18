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
    // Esta funcion es para comparar dos contraseñas pero no es un metodo estatico, podemos recibir una variable del tipo formGroup
    // para poder comparar los dos campos
export class ValidadorPassword {
    static CompararPassword( formulario: FormGroup ): ValidationErrors | null {
        
        if (!formulario) {
            return;
        }
        
        // Obtemos los valores de dicho formulario
        let password = formulario.value.password;
        let confirmPassword = formulario.value.confirm_password;

        // Si no son iguales entonces devolvemos un nombre del validador y su valor booleano
        if ( password !== confirmPassword) {
            return {
                noSonIguales: true
            };
        }
        return null;
    }
}

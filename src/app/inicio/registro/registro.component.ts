import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Validadores, ValidadorPassword } from './validadores';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  hide: Boolean = true;
  opcion: string;
  // Creamos una variable del tipo formgroup para usar formularios reactivos
  formulario: FormGroup;

  // Creamos una expresion regular para el formato del CURP
  formato = new RegExp('^[A-Z]{4}\\d{6}([A-Z]{6})\\d{2}$', 'i');
  // Realizamos la inyecccion del formBuilder
  // tslint:disable-next-line: variable-name
  constructor( private _fb: FormBuilder) { }

  ngOnInit() {
    init_plugins();
    this.CrearFormulario();
    this.ValoresDefecto();
  }

  CrearFormulario() {

    // Creamos el formulario
    this.formulario = this._fb.group( {     
      // Definimos los campos del formulario
      curp: [null, [Validators.required, Validators.pattern(this.formato)]],
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      fecha_nacimiento: [null, [Validators.required, Validadores.AnioFecha]],
      correo: [null, [Validators.required, Validators.email]],
      password: [null],
      confirm_password: [null, [Validators.required]],
      opcion: [null]
  }, { validators: this.CompararPassword() });
  }

  ValoresDefecto() {
    this.formulario.setValue( {
      curp: 'SASJ960311HNTLNN00',
      nombre: 'Ian',
      apellido: 'Vn',
      fecha_nacimiento: '1996-03-11',
      correo: 'shen_woo96@hotmail.com',
      password: '123456',
      confirm_password: '123456',
      opcion: 'option1'
    })
  }

  // Funcion para obtener acceso al control del formulario
  get f() {
    return this.formulario.controls;
  } 

  registro() {
    console.log(this.formulario);
    // let fecha = this.formulario.value.fecha_nacimiento.split('-');
    // console.log( Number(fecha[0]));
    // if ( Number(fecha[0]) < 1996) {
    //   console.log('fecha invalida');
    // } 
  }

  // Funcion para obtener los errores del curp
  getErrorCurp() {
    return this.f.curp.hasError('required') ? 'Este campo es obligatorio' :   
    this.f.curp.hasError('pattern') ? 'El curp no cumple con el formato adecuado' : '';
  }

  getErrorCorreo(){
    return this.f.correo.hasError('required') ? 'Debe insertar un correo' : 
    this.f.correo.hasError('email') ? 'No es un correo valido' : '';
  }

  // Configuramos un observable para que verifique la contraseña Observable<ValidationErrors> | null data !== this.f.password.value
  // tslint:disable-next-line: variable-name
  CompararPassword(): ValidationErrors | null  {

    return this.f.confirm_password.valueChanges.subscribe( data => {
      if (data !== this.f.password.value) {
        return {
          NoSonIguales: true
        };
      } else {
        return null;
      }
    });
  }

  getErrorPassword() {
    return this.f.confirm_password.hasError('required') ? 'Este campo es obligatorio' :
    this.f.confirm_password.hasError('NoSonIguales') ? 'Las contraseñas deben ser iguales' : '';
  }

}

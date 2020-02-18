import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registro/registro.component.css']
})
export class LoginComponent implements OnInit {

  // Creamos una variable para definir el formulario
  login: FormGroup;

  // Establecemos la expresion regular para definir el formato del CURP
  formato = new RegExp('^[A-Z]{4}\\d{6}([A-Z]{6})\\d{2}$', 'i');
  
  // Inyectamos el formbuilder
  constructor( private _fb: FormBuilder ) { }



  ngOnInit() {
    init_plugins();
    this.CrearFormulario();
  }

  CrearFormulario() {
    // Creamos los campos del formualario que son dos nada mas
    this.login = this._fb.group( {
      curp: [null, [Validators.required, Validators.pattern(this.formato)]],
      password: [null, [Validators.required]]
    });
  }

  // Funcion para implementar los resultados de las busquedas
  get f() {
    return this.login.controls;
  }
  Login() {
    console.log(this.login);
  }

  getErrorCurp() {
    return this.f.curp.hasError('required') ? 'Este campo es obligatorio' : 
    this.f.curp.hasError('pattern') ? 'El curp no cumple con el formato adecuado': '';
  }



}

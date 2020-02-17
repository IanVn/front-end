import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';




declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  hide: Boolean = true;

  // Creamos una variable del tipo formgroup para usar formularios reactivos
  formulario: FormGroup;


  constructor() { }

  ngOnInit() {
    init_plugins();
    this.CrearFormulario();
  }


  CrearFormulario() {
  this.formulario = new FormGroup( {
      curp: new FormControl(null, [Validators.required]),
      nombre: new FormControl(null, [Validators.required]),
      apellido: new FormControl(null, [Validators.required]),
      fecha_nacimiento: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  registro() {
  
    
  }

}

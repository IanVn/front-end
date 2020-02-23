import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioService} from '../../servicios/registro/formulario.service';
import { RegistroService } from '../../servicios/registro/registro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['../../inicio/registro/registro.component.css']
})
export class EstudiosComponent implements OnInit {

  // Creamos un formulario el cual será enviado
  estudios: FormGroup;

  // Creamos una variable la cual almacenará el arreglo de estudios profesionales que es un arreglo de objetos
  estudiosProfesionales: Observable<any>;
  // Realizamos la inyeccion del formBuilder
  constructor( private fb: FormBuilder, private formulario: FormularioService, private _registro: RegistroService ) { }

  ngOnInit() {
    this.CrearFormulario();
    this.EmitirFormulario();
    // Hacemos la asignacion para poder usarlo en un pipe async
    this.estudiosProfesionales = this._registro.ObtenerEstudiosProfesionales();
  }

  // Funcion para crear el formulario
  CrearFormulario() {
    this.estudios = this.fb.group( {
      nombre_estudio: [null, Validators.required]
    });
  }

  EmitirFormulario() {
    this.estudios.statusChanges.subscribe( data => {
      if( data === 'VALID') {      
        this.formulario.EmitirFormulario( this.estudios );
      } else {
        return;
      }
    });
  }
}

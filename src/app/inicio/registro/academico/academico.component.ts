import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormularioService } from 'src/app/servicios/registro/formulario.service';
import { RegistroService } from 'src/app/servicios/registro/registro.service';

@Component({
  selector: 'app-academico',
  templateUrl: './academico.component.html',
  styleUrls: ['./academico.component.css']
})
export class AcademicoComponent implements OnInit {

  // Creamos un formulario el cual será enviado
  estudios: FormGroup;

  // Creamos una variable la cual almacenará el arreglo de estudios profesionales que es un arreglo de objetos
  estudiosProfesionales: Observable<any>;
  gradoEstudios: Observable <any>;
  Escuela: Observable <any>;
  Cargo: Observable <any>;
  Nombramiento: Observable <any>;

  // Realizamos la inyeccion del formBuilder
  constructor( private fb: FormBuilder, private formulario: FormularioService, private _registro: RegistroService ) { }

  ngOnInit() {
    this.CrearFormulario();
    this.EmitirFormulario();
    // Hacemos la asignacion para poder usarlo en un pipe async
    this.estudiosProfesionales = this._registro.ObtenerEstudiosProfesionales();
    this.gradoEstudios = this._registro.ObtenerGradosEstudios();
    this.Escuela = this._registro.ObtenerEscuelas();
    this.Cargo = this._registro.ObtenerCargoAcademico();
    this.Nombramiento = this._registro.ObtenerNombramiento();
  }

  // Funcion para crear el formulario
  CrearFormulario() {
    this.estudios = this.fb.group( {
      nombre_estudio: [null, Validators.required],
      grado_estudio: [null, Validators.required],
      escuela: [null, Validators.required],
      cargo_academico: [null, Validators.required],
      nombramiento: [null, Validators.required]
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

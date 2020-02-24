import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistroService } from '../../../servicios/registro/registro.service';
import { FormularioService } from '../../../servicios/registro/formulario.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  // Creamos una variable del tipo FormGroup
  profesorForm: FormGroup;

  // Variables para crear observables que seran los que hagan las peticiones 
  ImparticionClase: Observable<any>;
  ProgramaAcademico: Observable <any>;
  DepartamentoAdscripcion: Observable<any>;

  // Inyectamos el formBuilder
  constructor( private fb: FormBuilder, private _registro: RegistroService, private formulario: FormularioService ) { }

  ngOnInit() {
    // Inicializamos el formulario
    this.CrearFormulario();
    this.EmitirFormulario();
    this.ImparticionClase = this._registro.ObtenerLugarImparticionClase();
    this.ProgramaAcademico = this._registro.ObtenerProgramasAcademicos();
    this.DepartamentoAdscripcion = this._registro.ObtenerDepartamentoAdscripcion();
  }

  // Funcion que crea el formulario
  CrearFormulario() {
    this.profesorForm = this.fb.group( {
      imparticion_clase: [null, Validators.required],
      programa_academico: [null, Validators.required],
      departamento_adscripcion: [null, Validators.required]
    });
  }

  // Funcion para emitir el formulario cuando este sea valido
  EmitirFormulario() {
    this.profesorForm.statusChanges.subscribe( data => {
      if( data === 'VALID') {      
        this.formulario.EmitirFormulario( this.profesorForm );
      } else {
        return;
      }
    });
  }




}

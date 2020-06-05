import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente:Cliente = new Cliente();
  private titulo:string = "Crear cliente";
  
  constructor() { }

  ngOnInit(): void {
  }

  public create(): void{
    console.log('Clieked!');
    console.log(this.cliente);
  }
}

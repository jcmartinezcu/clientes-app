import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public titulo:string = "Crear cliente";
  public errores:string[];

  constructor(private clienteService: ClienteService,
             private router: Router,
             private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        )
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente',`El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success')
      },
      err => {
        console.error('Código del error desde el backend :' + err.status);
        console.error(err.error.errors);
        this.errores = err.error.errors as string[];
      }
    )
  }

  update():void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      response =>{
        this.router.navigate(['/clientes']);
        swal.fire('Cliente actualizado', `${response.mensaje}: ${response.cliente.nombre}`,'success')
      },
      err => {
        console.error('Código del error desde el backend :' + err.status);
        console.error(err.error.errors);
        this.errores = err.error.errors as string[];
      }
    )
  }
}

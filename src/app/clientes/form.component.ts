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
        swal('Nuevo Cliente',`Cliente ${cliente.nombre} creado con éxito!`, 'success')
      }
    )
  }

  update():void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      cliente =>{
        this.router.navigate(['/clientes']);
        swal('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito`,'success')
      }
    )
  }
}

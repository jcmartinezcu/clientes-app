import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ClientesComponent } from './clientes.component';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8090/api/clientes';

  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router ) { }

  getClientes(): Observable<Cliente[]> {
    //return  of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response =>{
        let clientes = response as Cliente[];

        return clientes.map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Cliente),
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.Error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateCliente(cliente:Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.Error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.Error, 'error');
        return throwError(e);
      })
    );
  }
}

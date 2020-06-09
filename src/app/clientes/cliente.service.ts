import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8090/api/clientes';

  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router ) { }

  getClientes(): Observable<Cliente[]> {
    //return  of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
  }
}

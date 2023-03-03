import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/shared/models/evento';
import { SecurityService } from '../Security/security.service';

const url = 'https://localhost:3031/v1/eventos/';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  /* GET */
  consultarTodosEventos(): Observable<Evento[]> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<Evento[]>(url, {
      headers: headers,
    });
  }

  consultarProximosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(url + 'proximos');
  }

  consultarEventosAtivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(url + 'true/true');
  }

  ConsultarEventoPeloId(id: number): Observable<Evento> {
    return this.http.get<Evento>(url + id);
  }

  /* POST */
  cadastrarEvento(evento: Evento): Observable<Evento> {
    delete evento.id;
    delete evento.notifications;
    delete evento.isValid;

    return this.http.post<Evento>(url, evento);
  }

  /* DELETE */
  deletarEventoPeloId(id: number) {
    return this.http.delete(url + id);
  }
}

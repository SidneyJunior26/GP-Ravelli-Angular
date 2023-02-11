import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/events';

const url = 'http://localhost:3031/v1/Eventos/';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(url);
  }

  getEventsComing(): Observable<Event[]> {
    return this.http.get<Event[]>(url + 'proximos');
  }

  getEventsActives(): Observable<Event[]> {
    return this.http.get<Event[]>(url + 'true/true');
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(url + id);
  }

  deleteEventById(id: number) {
    return this.http.delete(url + id);
  }
}

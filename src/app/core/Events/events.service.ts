import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:5173/eventos/';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(url);
  }

  getEventsActives(): Observable<Event[]> {
    return this.http.get<Event[]>(url + 'true/true');
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(url + id);
  }
}

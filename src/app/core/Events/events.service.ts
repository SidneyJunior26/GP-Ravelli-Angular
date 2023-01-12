import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/events';

const url = 'http://localhost:21991/eventos/';

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

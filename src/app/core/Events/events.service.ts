import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/events';

const url = 'http://localhost:3031/eventos/';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(url);
  }

  getEventsComing(): Observable<Event[]> {
    return this.http.get<Event[]>(url + 'coming');
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

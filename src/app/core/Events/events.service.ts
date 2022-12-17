import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:5173/eventos/';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any[]>(url);
  }

  getEventsActives(): Observable<any> {
    return this.http.get<any[]>(url + 'true/true');
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(url + id);
  }
}

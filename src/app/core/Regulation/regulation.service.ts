import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regulation } from 'src/app/shared/models/regulation';

const url = 'http://localhost:3031/regulation/';

@Injectable({
  providedIn: 'root',
})
export class RegulationService {
  constructor(private http: HttpClient) {}

  getRegulationById(eventId: number): Observable<Regulation> {
    return this.http.get<Regulation>(url + eventId);
  }
}

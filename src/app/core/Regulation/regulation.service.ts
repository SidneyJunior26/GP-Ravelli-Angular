import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regulation } from 'src/app/shared/models/regulation';
import { SecurityService } from '../Security/security.service';

const url = 'http://localhost:3031/v1/regulamentos/';

@Injectable({
  providedIn: 'root',
})
export class RegulationService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  getRegulationById(eventId: number): Observable<Regulation> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<Regulation>(url + eventId, {
      headers: headers,
    });
  }
}

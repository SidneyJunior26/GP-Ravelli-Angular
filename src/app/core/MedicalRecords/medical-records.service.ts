import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecord } from 'src/app/shared/models/medicalRecord';
import { SecurityService } from '../Security/security.service';

const url = 'https://localhost:3031/v1/RegistrosMedicos/';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordsService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  getMedicalRecordsByAthleteId(athleteId: string): Observable<MedicalRecord> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<MedicalRecord>(url + athleteId, {
      headers: headers,
    });
  }
}

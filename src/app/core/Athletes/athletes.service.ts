import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from 'src/app/shared/models/athlete';

const url = 'http://localhost:21991/atletas/';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  constructor(private http: HttpClient) {}

  // GET
  getAthleteByCpf(cpf: string): Observable<any> {
    return this.http.get<any[]>(url + cpf);
  }

  getAthleteById(id: string): Observable<any> {
    return this.http.get<any[]>(url + 'id/' + id);
  }

  confirmAthlete(cpf: string, password: string): Observable<any> {
    return this.http.get<any>(url + 'confirmar/' + cpf + '/' + password);
  }

  postAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(url, athlete);
  }

  updateAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.put<Athlete>(url + athlete.cpf, athlete);
  }
}

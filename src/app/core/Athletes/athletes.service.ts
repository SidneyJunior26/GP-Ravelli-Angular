import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from 'src/app/shared/models/athlete';

const url = 'http://localhost:5173/atletas/';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  constructor(private http: HttpClient) {}

  getAthleteByCpf(cpf: string): Observable<any> {
    return this.http.get<any[]>(url + cpf);
  }

  getAthleteById(id: string): Observable<any> {
    return this.http.get<any[]>(url + 'id/' + id);
  }

  postAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(url, athlete);
  }
}

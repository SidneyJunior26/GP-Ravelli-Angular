import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}

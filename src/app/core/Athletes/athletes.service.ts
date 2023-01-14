import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Athlete } from 'src/app/shared/models/athlete';
import jwtDecode from 'jwt-decode';

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

  login(cpf: string, password: string): Observable<any> {
    return this.http
      .post<any>(url + 'login', {
        cpf: cpf,
        password: password,
      })
      .pipe(
        map((user) => {
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        })
      );
  }

  // POST
  postAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(url, athlete);
  }

  // UPDATE
  updateAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.put<Athlete>(url + athlete.cpf, athlete);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}

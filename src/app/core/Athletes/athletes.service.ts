import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Athlete } from 'src/app/shared/models/athlete';
import { SecurityService } from '../Security/security.service';

const url = 'http://localhost:3031/v1/Atletas/';
const securityUrl = 'http://localhost:3031/v1/Seguranca/';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  // GET
  verifyIfUserExists(cpf: string): Observable<any> {
    return this.http.get<any[]>(url + 'existe/' + cpf);
  }

  getAthleteByCpf(cpf: string): Observable<any> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<any[]>(url + 'consultar/' + cpf, {
      headers: headers,
    });
  }

  getAthleteById(id: string): Observable<any> {
    return this.http.get<any[]>(url + 'id/' + id);
  }

  login(cpf: string, password: string): Observable<any> {
    return this.http
      .post<any>(securityUrl + 'login', {
        cpf: cpf,
        password: password,
      })
      .pipe(
        map((token) => {
          return JSON.stringify(token);
        })
      );
  }

  // POST
  postAthlete(athlete: Athlete): Observable<Athlete> {
    return this.http.post<Athlete>(url, athlete);
  }

  // UPDATE
  updateAthlete(athlete: Athlete): Observable<Athlete> {
    const token = this.securityService.getToken();
    const headers = this.securityService.getDecodedAccessToken(token);

    return this.http.put<Athlete>(url + athlete.cpf, athlete, {
      headers: headers,
    });
  }
}

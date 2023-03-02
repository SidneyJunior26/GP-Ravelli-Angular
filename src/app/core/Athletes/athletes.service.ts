import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Atleta } from 'src/app/shared/models/athlete';
import { SecurityService } from '../Security/security.service';

const url = 'https://localhost:3031/v1/Atletas/';
const securityUrl = 'https://localhost:3031/v1/Seguranca/';

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

  consultarTodosAtletas(): Observable<any> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<any[]>(url, {
      headers: headers,
    });
  }

  getAllAthletesByCpf(cpf: string): Observable<any> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<any[]>(url + 'cpf/' + cpf, {
      headers: headers,
    });
  }

  getAllAthletesByName(name: string): Observable<any> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<any[]>(url + 'nome/' + name, {
      headers: headers,
    });
  }

  consultarAtletaPorCPF(cpf: string): Observable<any> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<any[]>(url + 'consultar/' + cpf, {
      headers: headers,
    });
  }

  getAthleteById(id: string): Observable<any> {
    return this.http.get<any[]>(url + 'id/' + id);
  }

  // POST
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

  loginManager(cpf: string, password: string): Observable<any> {
    return this.http
      .post<any>(securityUrl + 'login/adm', {
        cpf: cpf,
        password: password,
      })
      .pipe(
        map((token) => {
          return JSON.stringify(token);
        })
      );
  }

  postAthlete(athlete: Atleta): Observable<Atleta> {
    return this.http.post<Atleta>(url, athlete);
  }

  // UPDATE
  updateAthlete(athlete: Atleta): Observable<Atleta> {
    const token = this.securityService.getToken();
    const headers = this.securityService.getDecodedAccessToken(token);

    return this.http.put<Atleta>(url + athlete.cpf, athlete, {
      headers: headers,
    });
  }
}

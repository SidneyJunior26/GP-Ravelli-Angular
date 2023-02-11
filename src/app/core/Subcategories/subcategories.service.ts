import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from 'src/app/shared/models/subcategory';
import { SecurityService } from '../Security/security.service';

const url = 'http://localhost:3031/v1/SubCategoria/';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}
  //int category, int age, bool gender

  // GET
  getSubcategories(
    idEvent: number,
    category: number,
    age: number,
    gender: number
  ): Observable<Subcategory[]> {
    const headers = this.securityService.getAuthentiaction();

    return this.http.get<Subcategory[]>(
      url + idEvent + '/' + category + '/' + age + '/' + gender,
      {
        headers: headers,
      }
    );
  }
}

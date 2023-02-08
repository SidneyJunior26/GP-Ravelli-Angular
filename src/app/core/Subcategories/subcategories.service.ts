import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from 'src/app/shared/models/subcategory';

const url = 'http://localhost:3031/subcategories/';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private http: HttpClient) {}
  //int category, int age, bool gender

  // GET
  getSubcategories(
    idEvent: number,
    category: number,
    age: number,
    gender: number
  ): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(
      url + idEvent + '/' + category + '/' + age + '/' + gender
    );
  }
}

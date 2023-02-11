import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  tokenKey = 'currentUser';

  constructor(private router: Router) {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getToken(): string {
    let tokenValue = '';

    if (localStorage.getItem(this.tokenKey) != null)
      tokenValue = localStorage.getItem(this.tokenKey)!;

    return tokenValue;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('');
  }

  public getAuthentiaction(): HttpHeaders {
    if (this.getToken() != '')
      return new HttpHeaders().set(
        'Authorization',
        'Bearer ' + JSON.parse(this.getToken()).token
      );
    else return new HttpHeaders();
  }
}

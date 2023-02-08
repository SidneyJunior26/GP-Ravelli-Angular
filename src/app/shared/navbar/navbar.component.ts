import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SecurityService } from 'src/app/core/Security/security.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userIsLoggedIn = false;
  userName: string;

  constructor(
    private dialog: MatDialog,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') != null) {
      const token = localStorage.getItem('currentUser')!;
      let userInfo = this.securityService.getDecodedAccessToken(token);

      this.userName = userInfo.Name;
    }
  }

  login() {
    this.dialog.open(LoginComponent);
  }

  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  checkLogIn() {
    var token = localStorage.getItem('currentUser');

    if (token != null) {
      var userInfo = this.securityService.getDecodedAccessToken(token);

      this.userName = userInfo.Name;
    }

    this.userIsLoggedIn = token != null;
  }

  logOut() {
    localStorage.removeItem('currentUser');

    window.location.reload();
  }
}

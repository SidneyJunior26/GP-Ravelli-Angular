import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLogIn();
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
    var token = this.securityService.getToken();

    if (token != null) {
      var userInfo = this.securityService.getDecodedAccessToken(token);

      this.userName = userInfo.Name;
    } else {
      this.logOut();
      this.router.navigateByUrl('/');
    }

    this.userIsLoggedIn = token != null;
  }

  logOut() {
    localStorage.removeItem('currentUser');

    window.location.reload();
  }
}

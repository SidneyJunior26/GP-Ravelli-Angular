import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userIsLoggedIn = false;

  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {}

  viewUser(): void {
    //this.router.navigateByUrl('/user/' + this.userId);
  }

  registerUser(): void {
    this.router.navigateByUrl('/register');
  }

  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

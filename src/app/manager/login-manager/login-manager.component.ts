import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';
import { LoginComponent } from 'src/app/shared/login/login.component';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css'],
})
export class LoginManagerComponent implements OnInit {
  constructor(
    private service: AthletesService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  athlete: any;
  cpf: string;
  password: string;
  hide = true;

  ngOnInit(): void {
    localStorage.removeItem('currentUser');
  }

  loginControl = this.formBuilder.group({
    cpf: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  close() {
    this.dialogRef.close();
  }

  verifyAthlete() {
    this.cpf =
      this.loginControl.get('cpf')!.value != undefined
        ? this.loginControl.get('cpf')!.value!.toString()
        : '';
    this.password =
      this.loginControl.get('password')!.value != undefined
        ? this.loginControl.get('password')!.value!.toString()
        : '';

    if (this.cpf == null || this.cpf == '') {
      this.openMessage('Informe seu CPF/CNPJ');
      return;
    }

    this.findAthletheByCpf();
  }

  private openMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  private findAthletheByCpf() {
    this.service.loginManager(this.cpf, this.password).subscribe(
      (token) => {
        localStorage.setItem('currentUser', token);

        this.loginControl.get('cpf')!.setValue('');
        this.loginControl.get('password')!.setValue('');

        this.dialogRef.close();
      },
      (error) => {
        if (error.status == 404) {
          this.openMessage('Usuário não encontrado');
        }
        if (error.status == 401) {
          this.openMessage('Senha inválida');
        }
      }
    );
  }
}

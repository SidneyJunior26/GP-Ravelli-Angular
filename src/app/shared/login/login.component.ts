import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AthletesService } from 'src/app/core/Athletes/athletes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: AthletesService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  athlete: any;

  ngOnInit(): void {
    var cpf = localStorage.getItem('cpf');

    if (cpf != null) {
      this.loginControl.get('cpf')?.setValue(cpf);
      this.loginControl.get('password')?.setValue('');
      localStorage.removeItem('cpf');
    }
  }

  loginControl = this.formBuilder.group({
    cpf: new FormControl('cpf', Validators.required),
    password: new FormControl('password', Validators.required),
  });

  close() {
    this.dialogRef.close();
  }

  findAthleteByCpf() {
    const cpf = this.loginControl.get('cpf')?.value?.toString();

    if (cpf == null || cpf == '') {
      this.openMessage('Informe seu CPF/CNPJ');
      return;
    }

    this.service.getAthleteByCpf(cpf).subscribe(
      (athlete) => {
        console.log(athlete);
      },
      (error) => {
        if (error.status == 404) this.openMessage('Usuário não encontrado');
      }
    );
  }

  private openMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}

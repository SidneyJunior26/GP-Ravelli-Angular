import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    private snackBar: MatSnackBar
  ) {}
  athlete: any;

  ngOnInit(): void {}

  cpfControl = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
  ]);

  close() {
    this.dialogRef.close();
  }

  findAthleteByCpf() {
    const cpf = this.cpfControl.value?.toString();

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

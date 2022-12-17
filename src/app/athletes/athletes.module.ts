import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthleteRegisterComponent } from './athlete-register/athlete-register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCommonModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [AthleteRegisterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatCommonModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class AthletesModule {}

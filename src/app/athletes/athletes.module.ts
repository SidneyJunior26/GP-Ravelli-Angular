import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCommonModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventRegisterComponent } from '../events/event-register/event-register.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [EventRegisterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatCommonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
})
export class AthletesModule {}

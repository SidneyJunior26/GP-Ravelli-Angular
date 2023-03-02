import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsManagerComponent } from './events-manager/events-manager.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ImageUploadComponent } from '../shared/image-upload/image-upload.component';

@NgModule({
  declarations: [
    EventsManagerComponent,
    LoginManagerComponent,
    ImageUploadComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
  ],
})
export class ManagerModule {}

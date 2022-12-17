import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsAllActiveListComponent } from './events-all-active-list/events-all-active-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [EventsAllActiveListComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
  ],
})
export class EventsModule {}

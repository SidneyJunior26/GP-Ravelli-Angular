import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRegisterComponent } from './events/event-register/event-register.component';
import { EventsAllActiveListComponent } from './events/events-all-active-list/events-all-active-list.component';
import { EventsManagerComponent } from './manager/events-manager/events-manager.component';

const routes: Routes = [
  {
    path: '',
    component: EventsAllActiveListComponent,
  },
  {
    path: 'eventos',
    children: [
      {
        path: ':idEvent',
        component: EventRegisterComponent,
      },
      {
        path: ':idEvent',
        component: EventRegisterComponent,
      },
    ],
  },
  {
    path: 'manager',
    children: [
      {
        path: 'eventos',
        component: EventsManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

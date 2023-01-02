import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthleteRegisterComponent } from './athletes/athlete-register/athlete-register.component';
import { EventsAllActiveListComponent } from './events/events-all-active-list/events-all-active-list.component';

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
        component: AthleteRegisterComponent,
      },
      {
        path: ':idEvent/:idAthlete',
        component: AthleteRegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

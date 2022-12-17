import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAllActiveListComponent } from './events-all-active-list.component';

describe('EventsAllActiveListComponent', () => {
  let component: EventsAllActiveListComponent;
  let fixture: ComponentFixture<EventsAllActiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAllActiveListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsAllActiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

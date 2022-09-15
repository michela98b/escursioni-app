import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewItineraryComponent } from './dialog-new-itinerary.component';

describe('DialogNewItineraryComponent', () => {
  let component: DialogNewItineraryComponent;
  let fixture: ComponentFixture<DialogNewItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewItineraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

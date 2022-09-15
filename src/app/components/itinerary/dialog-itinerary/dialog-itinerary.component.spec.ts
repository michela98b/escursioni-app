import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItineraryComponent } from './dialog-itinerary.component';

describe('DialogItineraryComponent', () => {
  let component: DialogItineraryComponent;
  let fixture: ComponentFixture<DialogItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogItineraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

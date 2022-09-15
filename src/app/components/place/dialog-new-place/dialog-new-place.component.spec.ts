import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewPlaceComponent } from './dialog-new-place.component';

describe('DialogNewPlaceComponent', () => {
  let component: DialogNewPlaceComponent;
  let fixture: ComponentFixture<DialogNewPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

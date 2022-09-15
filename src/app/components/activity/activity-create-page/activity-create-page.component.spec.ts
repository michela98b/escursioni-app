import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreatePageComponent } from './activity-create-page.component';

describe('ActivityCreatePageComponent', () => {
  let component: ActivityCreatePageComponent;
  let fixture: ComponentFixture<ActivityCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

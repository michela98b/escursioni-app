import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathCreatePageComponent } from './path-create-page.component';

describe('PathCreatePageComponent', () => {
  let component: PathCreatePageComponent;
  let fixture: ComponentFixture<PathCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastsurveyComponent } from './pastsurvey.component';

describe('PastsurveyComponent', () => {
  let component: PastsurveyComponent;
  let fixture: ComponentFixture<PastsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastsurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintakesurveyComponent } from './admintakesurvey.component';

describe('AdmintakesurveyComponent', () => {
  let component: AdmintakesurveyComponent;
  let fixture: ComponentFixture<AdmintakesurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintakesurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintakesurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

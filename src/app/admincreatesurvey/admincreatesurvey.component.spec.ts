import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincreatesurveyComponent } from './admincreatesurvey.component';

describe('AdmincreatesurveyComponent', () => {
  let component: AdmincreatesurveyComponent;
  let fixture: ComponentFixture<AdmincreatesurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincreatesurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincreatesurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

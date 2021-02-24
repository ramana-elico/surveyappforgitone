import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincompletesurveyComponent } from './admincompletesurvey.component';

describe('AdmincompletesurveyComponent', () => {
  let component: AdmincompletesurveyComponent;
  let fixture: ComponentFixture<AdmincompletesurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincompletesurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincompletesurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

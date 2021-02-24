import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincreateusersComponent } from './admincreateusers.component';

describe('AdmincreateusersComponent', () => {
  let component: AdmincreateusersComponent;
  let fixture: ComponentFixture<AdmincreateusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincreateusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincreateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

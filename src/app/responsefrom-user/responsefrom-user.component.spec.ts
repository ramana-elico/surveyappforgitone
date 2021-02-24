import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsefromUserComponent } from './responsefrom-user.component';

describe('ResponsefromUserComponent', () => {
  let component: ResponsefromUserComponent;
  let fixture: ComponentFixture<ResponsefromUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsefromUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsefromUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

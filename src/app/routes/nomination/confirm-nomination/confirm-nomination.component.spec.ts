import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNominationComponent } from './confirm-nomination.component';

describe('ConfirmNominationComponent', () => {
  let component: ConfirmNominationComponent;
  let fixture: ComponentFixture<ConfirmNominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmNominationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

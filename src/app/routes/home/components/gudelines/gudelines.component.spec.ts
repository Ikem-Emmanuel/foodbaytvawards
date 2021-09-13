import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GudelinesComponent } from './gudelines.component';

describe('GudelinesComponent', () => {
  let component: GudelinesComponent;
  let fixture: ComponentFixture<GudelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GudelinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GudelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

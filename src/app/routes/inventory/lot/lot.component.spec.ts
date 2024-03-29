/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LotComponent } from './lot.component';

describe('LotComponent', () => {
  let component: LotComponent;
  let fixture: ComponentFixture<LotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

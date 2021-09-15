import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistingComponent } from './shortlisting.component';

describe('ShortlistingComponent', () => {
  let component: ShortlistingComponent;
  let fixture: ComponentFixture<ShortlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

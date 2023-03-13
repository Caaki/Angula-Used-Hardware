import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxPrbaComponent } from './ngrx-prba.component';

describe('NgrxPrbaComponent', () => {
  let component: NgrxPrbaComponent;
  let fixture: ComponentFixture<NgrxPrbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxPrbaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxPrbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

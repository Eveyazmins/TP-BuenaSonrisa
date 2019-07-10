import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Aux1Component } from './aux1.component';

describe('Aux1Component', () => {
  let component: Aux1Component;
  let fixture: ComponentFixture<Aux1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aux1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aux1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

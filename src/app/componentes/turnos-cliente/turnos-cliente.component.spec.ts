import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosClienteComponent } from './turnos-cliente.component';

describe('TurnosClienteComponent', () => {
  let component: TurnosClienteComponent;
  let fixture: ComponentFixture<TurnosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

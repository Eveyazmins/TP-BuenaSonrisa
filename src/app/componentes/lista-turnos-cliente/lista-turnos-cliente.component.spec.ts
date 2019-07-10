import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurnosClienteComponent } from './lista-turnos-cliente.component';

describe('ListaTurnosClienteComponent', () => {
  let component: ListaTurnosClienteComponent;
  let fixture: ComponentFixture<ListaTurnosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTurnosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTurnosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

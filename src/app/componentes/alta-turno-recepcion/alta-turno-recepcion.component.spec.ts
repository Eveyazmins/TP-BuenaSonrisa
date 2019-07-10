import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTurnoRecepcionComponent } from './alta-turno-recepcion.component';

describe('AltaTurnoRecepcionComponent', () => {
  let component: AltaTurnoRecepcionComponent;
  let fixture: ComponentFixture<AltaTurnoRecepcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTurnoRecepcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTurnoRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasClienteComponent } from './encuestas-cliente.component';

describe('EncuestasClienteComponent', () => {
  let component: EncuestasClienteComponent;
  let fixture: ComponentFixture<EncuestasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

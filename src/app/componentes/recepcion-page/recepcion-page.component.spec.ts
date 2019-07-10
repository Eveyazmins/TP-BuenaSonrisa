import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionPageComponent } from './recepcion-page.component';

describe('RecepcionPageComponent', () => {
  let component: RecepcionPageComponent;
  let fixture: ComponentFixture<RecepcionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

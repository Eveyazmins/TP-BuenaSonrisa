import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaPageComponent } from './especialista-page.component';

describe('EspecialistaPageComponent', () => {
  let component: EspecialistaPageComponent;
  let fixture: ComponentFixture<EspecialistaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialistaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

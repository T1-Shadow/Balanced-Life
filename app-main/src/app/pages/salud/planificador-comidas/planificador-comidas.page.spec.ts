import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanificadorComidasPage } from './planificador-comidas.page';

describe('PlanificadorComidasPage', () => {
  let component: PlanificadorComidasPage;
  let fixture: ComponentFixture<PlanificadorComidasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificadorComidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

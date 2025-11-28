import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HidratacionPage } from './hidratacion.page';

describe('HidratacionPage', () => {
  let component: HidratacionPage;
  let fixture: ComponentFixture<HidratacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HidratacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

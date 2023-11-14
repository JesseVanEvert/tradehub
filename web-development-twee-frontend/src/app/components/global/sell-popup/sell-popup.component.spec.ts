import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPopupComponent } from './sell-popup.component';

describe('SellPopupComponent', () => {
  let component: SellPopupComponent;
  let fixture: ComponentFixture<SellPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellPopupComponent]
    });
    fixture = TestBed.createComponent(SellPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsOtherViewComponent } from './admin-products-other-view.component';

describe('AdminProductsOtherViewComponent', () => {
  let component: AdminProductsOtherViewComponent;
  let fixture: ComponentFixture<AdminProductsOtherViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductsOtherViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsOtherViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

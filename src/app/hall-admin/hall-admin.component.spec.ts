import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallAdminComponent } from './hall-admin.component';

describe('HallAdminComponent', () => {
  let component: HallAdminComponent;
  let fixture: ComponentFixture<HallAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HallAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HallAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

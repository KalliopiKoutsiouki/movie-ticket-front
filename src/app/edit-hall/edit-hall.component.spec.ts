import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHallComponent } from './edit-hall.component';

describe('EditHallComponent', () => {
  let component: EditHallComponent;
  let fixture: ComponentFixture<EditHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicComponent } from './add-medic.component';

describe('AddMedicComponent', () => {
  let component: AddMedicComponent;
  let fixture: ComponentFixture<AddMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

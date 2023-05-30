import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SearchResult } from 'src/app/types/SearchResult';
import { Ingredient } from 'src/app/types/Ingredient';

import { PrescriptionComponent } from './prescription.component';

describe('PrescriptionComponent', () => {
  let component: PrescriptionComponent;
  let fixture: ComponentFixture<PrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionComponent],
      imports: [FontAwesomeModule, FormsModule],
    });
    fixture = TestBed.createComponent(PrescriptionComponent);
    component = fixture.componentInstance;
    component.prescription = {
      application_number: '123456',
      brand_name: 'Brand Name',
      sponsor_name: 'Sponsor Name',
      marketing_status: 'Marketing Status',
      dosage_form: 'Dosage Form',
      route: 'Route',
      active_ingredients: [
        {
          name: 'Active Ingredient',
          strength: 'Strength',
        },
      ] as Ingredient[],
    } as SearchResult;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

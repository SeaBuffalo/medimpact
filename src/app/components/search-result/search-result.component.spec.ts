import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResult } from 'src/app/types/SearchResult';
import { Ingredient } from 'src/app/types/Ingredient';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
    });
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    component.result = {
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

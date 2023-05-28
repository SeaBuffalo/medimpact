import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultComponent } from '../search-result/search-result.component';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchBarComponent, SearchResultComponent],
      imports: [HttpClientTestingModule, FontAwesomeModule],
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

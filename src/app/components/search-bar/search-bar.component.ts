import { Component, Output, EventEmitter, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CallService } from '../../services/call.service';
import { SearchResult } from '../../types/SearchResult';
import { FilterMenuOptions } from '../../types/FilterMenuOptions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  public faSearch = faSearch;
  public faTimes = faTimes;
  public searchTerm: string = '';
  public errorMessage: null | string = null;
  public suggestions: string[] = ['advil', 'ibuprofen', 'tylenol', 'aleve'];
  public showSuggestions: boolean = false;
  public highlightIndex: number = 0;
  private debounce: ReturnType<typeof setTimeout> | null = null;
  @Input() set scrollClose(value: boolean) {
    if (value) {
      this.showSuggestions = false;
    }
  }
  @Input() filterMenuOpen: boolean = false;
  @Input() filterMenuOptions: FilterMenuOptions = {
    search_by: 'all',
    distribution: 'all',
    administration: 'all',
    results: '10',
  };
  @Output() focus = new EventEmitter<boolean>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() searchResults = new EventEmitter<SearchResult[]>();

  constructor(private callService: CallService) {}

  //search and update results
  newSearch(query: string): void {
    //if query is empty, return
    if (query.length < 1) return;

    //que loading state
    this.loading.emit(true);

    this.callService.getDrugs(query, this.filterMenuOptions).subscribe({
      //handle successful response
      next: (data) => {
        this.callService.removeError();
        //build new results array
        let newResults: SearchResult[] = [];
        data.results.forEach((result: any) => {
          if (
            !result.products ||
            !result.sponsor_name ||
            !result.products[0].brand_name ||
            !result.products[0].dosage_form ||
            !result.products[0].route ||
            !result.products[0].active_ingredients ||
            !result.products[0].marketing_status ||
            !result.application_number
          )
            return;
          let newResult: SearchResult = {
            sponsor_name: result.sponsor_name,
            brand_name: result.products[0].brand_name,
            dosage_form: result.products[0].dosage_form,
            route: result.products[0].route,
            active_ingredients: result.products[0].active_ingredients,
            marketing_status: result.products[0].marketing_status,
            application_number: result.application_number,
          };
          newResults.push(newResult);
        });
        window.scrollTo(0, 0);

        //if no results, throw new error and return
        if (newResults.length === 0) {
          this.errorMessage = 'No results found.';
          this.searchResults.emit([]);
          this.callService.handleError(this.errorMessage);
          return;
        }

        //emit new results
        this.searchResults.emit(newResults);
        this.showSuggestions = false;
        this.highlightIndex = 0;
      },

      //handle error response
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.error.message;
        this.searchResults.emit([]);
        this.callService.handleError(error);
      },
    });

    //end loading state
    this.loading.emit(false);
    document.getElementById('search-bar-input')?.blur();
  }

  //clear search bar and focus for new query
  clearSearchTerm(): void {
    this.searchTerm = '';
    this.suggestions = ['advil', 'ibuprofen', 'tylenol', 'aleve'];
    this.errorMessage = null;
    document.getElementById('search-bar-input')?.focus();
    this.showSuggestions = true;
  }

  //close menu on focus if overlapping
  handleFocus(): void {
    this.focus.emit(true);
    this.showSuggestions = true;
  }

  //handle changes to search bar
  handleKeyup(event: KeyboardEvent): void {
    event.preventDefault();
    this.debounce = null;
    //render results
    if (event.key === 'Enter' && this.searchTerm.length > 0) {
      this.newSearch(this.searchTerm);
      return;
    }

    //highlight suggestions
    if (event.key === 'ArrowDown' && this.suggestions.length > 0) {
      this.highlightIndex = 0;
      this.highlightSuggestion(this.highlightIndex);
      return;
    }

    //handle clearing search term
    if (this.searchTerm.length < 1) {
      this.suggestions = ['advil', 'ibuprofen', 'tylenol', 'aleve'];
      return;
    }

    //handle suggestions
    if (/[a-zA-Z]/.test(event.key) || event.key === 'Backspace') {
      this.callService.getDrugs(this.searchTerm).subscribe({
        next: (data) => {
          let newSuggestions: string[] = [];
          data.results.forEach((result: any) => {
            if (newSuggestions.includes(result.products[0].brand_name)) return;
            newSuggestions.push(result.products[0].brand_name);
          });
          this.suggestions = newSuggestions;
          this.highlightIndex = 0;
        },
      });
    }
  }

  //debounce input to prevent too many api calls
  debounceInput(event: KeyboardEvent): void {
    clearTimeout(this.debounce as ReturnType<typeof setTimeout>);
    this.debounce = setTimeout(() => {
      this.handleKeyup(event);
    }, 250);
  }

  handleSuggestionClick(suggestion: string): void {
    //set search term and query api, then close suggestions on timeout
    this.searchTerm = suggestion;
    this.newSearch(this.searchTerm);
    setTimeout(() => {
      this.showSuggestions = false;
    }, 75);
  }

  highlightSuggestion(highlightIndex: number): void {
    //find suggestions container and highlight inputed suggestion
    const container = document.getElementById(
      'suggestion-container'
    ) as HTMLUListElement;
    if (container) {
      const suggestions = container.getElementsByTagName('li');
      if (suggestions.length < 1) return;
      const suggestion = suggestions[highlightIndex]
        .children[0] as HTMLButtonElement;
      suggestion.focus();
    }
  }

  highlightFirstSuggestion(event: Event): void {
    event.preventDefault();
    this.highlightIndex = 0;
    this.highlightSuggestion(this.highlightIndex);
  }

  highlightSuggestionUp(event: Event): void {
    //highlight previous suggestion, or focus on input if at top
    event.preventDefault();
    if (this.highlightIndex === 0) {
      document.getElementById('search-bar-input')?.focus();
      return;
    }
    this.highlightIndex--;
    this.highlightSuggestion(this.highlightIndex);
  }

  highlightSuggestionDown(event: Event): void {
    //highlight next suggestion, or return if at bottom
    event.preventDefault();
    if (this.highlightIndex >= this.suggestions.length - 1) return;
    this.highlightIndex++;
    this.highlightSuggestion(this.highlightIndex);
  }

  handleBlur(): void {
    //close suggestions on blur if not focused on suggestions or search bar
    setTimeout(() => {
      const container = document.getElementById(
        'suggestion-container'
      ) as HTMLUListElement;
      if (container) {
        const suggestionElements = container.getElementsByTagName('li');
        let suggestionsFocused = false;
        for (let i = 0; i < suggestionElements.length; i++) {
          const suggestion = suggestionElements[i]
            .children[0] as HTMLButtonElement;
          if (suggestion === document.activeElement) suggestionsFocused = true;
        }
        if (
          document.getElementById('search-bar-input') === document.activeElement
        ) {
          suggestionsFocused = true;
        }
        if (!suggestionsFocused) this.showSuggestions = false;
      }
    }, 75);
  }
}

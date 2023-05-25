import { Component, Output, EventEmitter } from '@angular/core';
import { FilterMenuOptions } from '../../types/FilterMenuOptions';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent {
  currentOptions: FilterMenuOptions = {
    search_by: 'all',
    distribution: 'all',
    administration: 'all',
    results: '10'
  };
  @Output() filterMenuOptions = new EventEmitter<FilterMenuOptions>();

  constructor() { }

  updateFilterMenuOptions(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const name = target.name;
    const value = target.value;
    let options = this.currentOptions;
    options[name as keyof FilterMenuOptions] = value;
    this.currentOptions = options;
    this.filterMenuOptions.emit(this.currentOptions);
  }
}

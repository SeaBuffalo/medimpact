import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-suggestions',
  templateUrl: './search-suggestions.component.html',
  styleUrls: ['./search-suggestions.component.css']
})
export class SearchSuggestionsComponent {
  @Input() suggestion!: string;
  @Output() blur = new EventEmitter<boolean>();

  constructor() { }

  focus(): void {
    this.blur.emit(true);
  }
}

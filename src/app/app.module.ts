import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { SearchComponent } from './components/search/search.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchSuggestionsComponent } from './components/search-suggestions/search-suggestions.component';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrescriptionsComponent,
    SearchComponent,
    PrescriptionComponent,
    SearchResultComponent,
    SearchBarComponent,
    SearchSuggestionsComponent,
    FilterMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

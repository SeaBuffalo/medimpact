import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FilterMenuOptions } from '../types/FilterMenuOptions';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiurl: string = 'https://api.fda.gov/drug/drugsfda.json?search=';
  private errorMessage: null | string = null;
  private errorSubject = new Subject<string | null>();

  constructor(private http: HttpClient) {}

  public handleError(error: HttpErrorResponse) {
    let newError = error.error.error.message;
    if (typeof newError === 'string') {
      this.errorMessage = newError;
      this.errorSubject.next(this.errorMessage);
    }
  }

  public removeError() {
    this.errorMessage = null;
    this.errorSubject.next(this.errorMessage);
  }

  public onHandleError() {
    return this.errorSubject.asObservable();
  }

  public getDrugs(
    query: string,
    filterMenuOptions?: FilterMenuOptions
  ): Observable<any> {
    const sanitizedQuery = query
      .toUpperCase()
      .replaceAll(' ', '+')
      .replaceAll('/', '')
      .replaceAll('&', '');
    if (filterMenuOptions) {
      const results = filterMenuOptions.results;
      let search_by: null | string = null;
      if (filterMenuOptions.search_by !== 'all') {
        switch (filterMenuOptions.search_by) {
          case 'brand-name':
            search_by = `products.brand_name:(${sanitizedQuery})`;
            break;
          case 'sponsor-name':
            search_by = `sponsor_name:(${sanitizedQuery})`;
            break;
          case 'active-ingredients':
            search_by = `products.active_ingredients.name:(${sanitizedQuery})`;
            break;
          default:
            break;
        }
      }
      let distribution: null | string = null;
      if (filterMenuOptions.distribution !== 'all') {
        switch (filterMenuOptions.distribution) {
          case 'discontinued':
            distribution = 'products.marketing_status:Discontinued';
            break;
          case 'prescription':
            distribution = 'products.marketing_status:Prescription';
            break;
          case 'counter':
            distribution = 'products.marketing_status:Over-the-counter';
            break;
          default:
            break;
        }
      }

      let administration: string | null = null;
      if (filterMenuOptions.administration !== 'all') {
        switch (filterMenuOptions.administration) {
          case 'oral':
            administration = 'products.route:ORAL';
            break;
          case 'topical':
            administration = 'products.route:TOPICAL';
            break;
          case 'injection':
            administration = 'products.route:INJECTION';
            break;
          default:
            break;
        }
      }
      let url = this.apiurl;
      if (!search_by && !distribution && !administration) {
        url += `(${sanitizedQuery})`;
        url += `&limit=${results}`;
        return this.http.get<any>(url);
      }
      if (search_by) {
        url += search_by;
      } else {
        url += `(${sanitizedQuery})`;
      }
      if (distribution) {
        url += '+AND+' + distribution;
      }
      if (administration) {
        url += '+AND+' + administration;
      }
      url += `&limit=${results}`;
      return this.http.get<any>(url);
    }
    const url = `${this.apiurl}(${sanitizedQuery})&limit=10`;
    return this.http.get<any>(url);
  }
}

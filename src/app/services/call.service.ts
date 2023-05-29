import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FilterMenuOptions } from '../types/FilterMenuOptions';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiurl: string =
    'https://api.fda.gov/drug/drugsfda.json?search=';
  private errorMessage: null | string = null;
  private errorSubject = new Subject<string | null>();

  constructor(private http: HttpClient) {}

  public handleError(error: HttpErrorResponse | string) {
    let newError: string;
    if (typeof error === 'string') {
      newError = error;
    } else {
      newError = error.error.error.message;
    }
    if (newError) {
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
    //sanitize query, add special openfda syntax
    const sanitizedQuery = query
      .toUpperCase()
      .replaceAll('%', '%25')
      .replaceAll('+', '%2B')
      .replaceAll(' ', '+')
      .replaceAll('&', '%26')
      .replaceAll('#', '');

    //if filter options, build special query
    if (filterMenuOptions) {
      //number of results
      const results = filterMenuOptions.results;
      
      //determine field to search by
      let search_by: null | string = null;
      if (filterMenuOptions.search_by !== 'all') {
        switch (filterMenuOptions.search_by) {
          case 'brand-name':
            search_by = `products.brand_name:("${sanitizedQuery}")`;
            break;
          case 'sponsor-name':
            search_by = `sponsor_name:("${sanitizedQuery}")`;
            break;
          case 'active-ingredients':
            search_by = `products.active_ingredients.name.exact:("${sanitizedQuery}")`;
            break;
          default:
            break;
        }
      }

      //determine distribution
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

      //determine administration
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

      //build url
      let url = this.apiurl;

      //if no special filter options, just search by query
      if (!search_by && !distribution && !administration) {
        url = `${this.apiurl}("${sanitizedQuery}")&limit=10`;
        return this.http.get<any>(url);
      }

      //if special search_by field, add to url, otherwise just search by query
      if (search_by) {
        url += search_by;
      } else {
        url += `("${sanitizedQuery}")`;
      }

      //if distribution or administration, add to url
      if (distribution) {
        url += '+AND+' + distribution;
      }
      if (administration) {
        url += '+AND+' + administration;
      }

      //add limit to url
      url += `&limit=${results}`;
      return this.http.get<any>(url);
    }

    //if no filter options, just search by query
    const url = `${this.apiurl}("${sanitizedQuery}")&limit=10`;
    return this.http.get<any>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiurl: string = 'https://api.fda.gov/drug/drugsfda.json?';
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

  public getDrugs(query: string): Observable<any> {
    const sanitizedQuery = query.replaceAll(' ', '+').replaceAll('/', '+').replaceAll('&', '');
    const url = `${this.apiurl}search=${sanitizedQuery}&limit=10`;
    return this.http.get<any>(url);
  }
}

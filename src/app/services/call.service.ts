import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiurl = 'https://api.fda.gov/drug/drugsfda.json?';

  constructor(private http: HttpClient) {}

  getDrugs(query?: string): Observable<any> {
    const url = `${this.apiurl}${query ? `search=${query}` : ''}&limit=20`;
    console.log(url);
    return this.http.get<any>(url);
  }
}

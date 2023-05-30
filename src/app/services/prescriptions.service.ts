import { Injectable } from '@angular/core';
import { SearchResult } from '../types/SearchResult';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsService {
  prescriptions: SearchResult[] = JSON.parse(
    window.localStorage.getItem('prescriptions') || '[]'
  );
  private prescriptionsSubject = new Subject<SearchResult[]>();

  constructor() {}

  addPrescription(prescription: SearchResult): void {
    //check if prescription already exists
    if (
      this.prescriptions.find(
        (item) => item.application_number === prescription.application_number
      )
    ) {
      return;
    }

    //add prescription, update localStorage
    this.prescriptions.push(prescription);
    window.localStorage.setItem(
      'prescriptions',
      JSON.stringify(this.prescriptions)
    );
    this.prescriptionsSubject.next(this.prescriptions);
  }

  removePrescription(prescription: SearchResult): void {
    //remove prescription, update localStorage
    this.prescriptions = this.prescriptions.filter(
      (item) => item.application_number !== prescription.application_number
    );
    window.localStorage.setItem(
      'prescriptions',
      JSON.stringify(this.prescriptions)
    );
    this.prescriptionsSubject.next(this.prescriptions);
  }

  onUpdatePrescriptions(): Observable<SearchResult[]> {
    return this.prescriptionsSubject.asObservable();
  }
}

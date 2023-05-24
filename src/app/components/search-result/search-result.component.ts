import { Component, Input } from '@angular/core';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { SearchResult } from '../../types/SearchResult';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
  @Input() result!: SearchResult;
  private prescriptionSubscription!: Subscription;
  public isAdded: boolean = false;

  constructor(private prescriptionService: PrescriptionsService) {
    this.prescriptionSubscription = this.prescriptionService
      .onUpdatePrescriptions()
      .subscribe(() => this.determineIfAdded());
  }

  ngOnInit(): void {
    this.determineIfAdded();
  }

  ngOnDestroy() {
    this.prescriptionSubscription.unsubscribe();
  }

  togglePrescription(): void {
    if (this.isAdded) {
      this.prescriptionService.removePrescription(this.result);
      return;
    }
    this.prescriptionService.addPrescription(this.result);
  }

  determineIfAdded(): void {
    this.isAdded = this.prescriptionService.prescriptions.find(
      (item) => item.application_number === this.result.application_number
    )
      ? true
      : false;
  }
}

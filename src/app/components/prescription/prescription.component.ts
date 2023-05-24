import { Component, Input } from '@angular/core';
import { SearchResult } from '../../types/SearchResult';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent {
  @Input() prescription!: SearchResult;
  faTimes = faTimes;

  constructor(private prescriptionsService: PrescriptionsService) {}

  removePrescription(): void {
    this.prescriptionsService.removePrescription(this.prescription);
  }
}

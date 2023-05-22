import { Component } from '@angular/core';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
})
export class PrescriptionsComponent {
  showPrescriptionBar = false;

  togglePrescriptionBar() {
    this.showPrescriptionBar = !this.showPrescriptionBar;
  }
}

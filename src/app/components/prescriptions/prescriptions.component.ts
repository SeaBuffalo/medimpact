import { Component } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { PrescriptionsService } from '../../services/prescriptions.service';
import { SearchResult } from '../../types/SearchResult';
import { Ingredient } from '../../types/Ingredient';
import { Subscription } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
})
export class PrescriptionsComponent {
  public searchTerm: string = '';
  public faTimes = faTimes;
  public showMenu: boolean = window.innerWidth < 768 ? false : true;
  private prescriptions: SearchResult[] = JSON.parse(
    window.localStorage.getItem('prescriptions') || '[]'
  );
  public shownPrescriptions: SearchResult[] = this.prescriptions;
  private menuSubscription!: Subscription;
  private prescriptionSubscription!: Subscription;


  showPrescriptionBar = false;

  constructor(
    private toggleMenuService: ToggleMenuService,
    private prescriptionsService: PrescriptionsService
  ) {
    this.menuSubscription = this.toggleMenuService
      .onToggleMenu()
      .subscribe((value) => this.handleToggleMenu(value));
    this.prescriptionSubscription = this.prescriptionsService
      .onUpdatePrescriptions()
      .subscribe((prescriptions) =>
        this.handleUpdatePrescriptions(prescriptions)
      );
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.prescriptionSubscription.unsubscribe();
  }

  handleToggleMenu(value: boolean): void {
    this.showMenu = value;
  }

  handleUpdatePrescriptions(prescriptions: SearchResult[]): void {
    this.prescriptions = prescriptions;
    this.shownPrescriptions = prescriptions;
  }

  filterPrescriptions(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.shownPrescriptions = [];
    this.prescriptions.forEach((prescription) => {
      for (const [key, value] of Object.entries(prescription)) {
        let prescriptionIsShown = false;
        if (typeof value === 'string') {
          if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
            prescriptionIsShown = true;
          }
        }
        if (key === 'active_ingredients') {
          prescription.active_ingredients.forEach((ingredient: Ingredient) => {
            if (
              ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) || ingredient.strength.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              prescriptionIsShown = true;
            }
          });
        }
        if (prescriptionIsShown) {
          this.shownPrescriptions.push(prescription);
          break;
        }
      }
    });
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.shownPrescriptions = this.prescriptions;
    document.getElementById('prescriptions-filter')?.focus();
  }
}

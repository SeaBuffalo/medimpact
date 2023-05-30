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
  private timeout!: ReturnType<typeof setTimeout>;

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
    //update classes to trigger animation, cancel timeout if menu is still sliding when triggered again
    if (value) {
      clearTimeout(this.timeout);
      document.querySelector('.prescriptions')?.classList.remove('slide-out')
      document.querySelector('.prescriptions')?.classList.add('slide-in')
      this.showMenu = value;      
    } else {
      document.querySelector('.prescriptions')?.classList.remove('slide-in')
      document.querySelector('.prescriptions')?.classList.add('slide-out')
      this.timeout = setTimeout(() => {
        this.showMenu = value;
      } , 300)
    }
  }

  handleUpdatePrescriptions(prescriptions: SearchResult[]): void {
    this.prescriptions = prescriptions;
    this.filterPrescriptions(this.searchTerm);
  }

  filterPrescriptions(searchTerm: string): void {
    this.shownPrescriptions = [];
    this.prescriptions.forEach((prescription) => {
      //check if any of the prescription's properties contain the search term
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
              ingredient.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              ingredient.strength
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
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

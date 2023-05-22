import { Component } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
})
export class PrescriptionsComponent {
  showMenu: boolean = window.innerWidth < 768 ? false : true;
  subscription!: Subscription;

  showPrescriptionBar = false;

  constructor(private toggleMenuService: ToggleMenuService) {
    this.subscription = this.toggleMenuService
      .onToggleMenu()
      .subscribe((value) => (this.handleToggleMenu(value)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleToggleMenu(value: boolean): void {
    this.showMenu = value;
  }
}

import { Component, Input } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { OverlayMenuService } from '../../services/overlay-menu.service';
import { CallService } from '../../services/call.service';
import { Subscription } from 'rxjs';
import { SearchResult } from '../../types/searchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private showMenu: boolean = window.innerWidth < 768 ? false : true;
  private overlayMenu: boolean = window.innerWidth < 768 ? true : false;
  private toggleMenuSubscription!: Subscription;
  private overlayMenuSubscription!: Subscription;
  private callServiceSubscription!: Subscription;
  public errorMessage: string | null = null;
  public sectionClass: string =
    window.innerWidth < 768 ? 'search-nomenu' : 'search';
  public headerWidthFull: boolean = window.innerWidth < 768 ? true : false;
  @Input() searchResults: SearchResult[] = [
    {
      sponsor_name: 'ORTHO MCNEIL PHARM',
      brand_name: 'TYLENOL W/ CODEINE NO. 4',
      dosage_form: 'CAPSULE',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '300MG',
        },
        {
          name: 'CODEINE PHOSPHATE',
          strength: '60MG',
        },
      ],
      marketing_status: 'Discontinued',
    },
    {
      sponsor_name: 'ORTHO MCNEIL PHARM',
      brand_name: 'TYLENOL W/ CODEINE NO. 3',
      dosage_form: 'CAPSULE',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '300MG',
        },
        {
          name: 'CODEINE PHOSPHATE',
          strength: '30MG',
        },
      ],
      marketing_status: 'Discontinued',
    },
    {
      sponsor_name: 'JANSSEN PHARMS',
      brand_name: 'TYLENOL W/ CODEINE NO. 3',
      dosage_form: 'TABLET',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '300MG',
        },
        {
          name: 'CODEINE PHOSPHATE',
          strength: '30MG',
        },
      ],
      marketing_status: 'Discontinued',
    },
    {
      sponsor_name: 'ORTHO MCNEIL PHARM',
      brand_name: 'TYLENOL W/ CODEINE',
      dosage_form: 'TABLET',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '325MG',
        },
        {
          name: 'CODEINE PHOSPHATE',
          strength:
            '30MG **Federal Register determination that product was not discontinued or withdrawn for safety or effectiveness reasons**',
        },
      ],
      marketing_status: 'Discontinued',
    },
    {
      sponsor_name: 'ORTHO MCNEIL PHARM',
      brand_name: 'TYLENOL W/ CODEINE',
      dosage_form: 'SOLUTION',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '120MG/5ML',
        },
        {
          name: 'CODEINE PHOSPHATE',
          strength: '12MG/5ML',
        },
      ],
      marketing_status: 'Discontinued',
    },
    {
      sponsor_name: 'J AND J CONSUMER INC',
      brand_name: 'TYLENOL',
      dosage_form: 'SUPPOSITORY',
      route: 'RECTAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '650MG',
        },
      ],
      marketing_status: 'Discontinued',
    },
    {
      sponsor_name: 'J AND J CONSUMER INC',
      brand_name: 'TYLENOL',
      dosage_form: 'TABLET, EXTENDED RELEASE',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '650MG',
        },
      ],
      marketing_status: 'Over-the-counter',
    },
    {
      sponsor_name: 'L PERRIGO CO',
      brand_name: 'ACETAMINOPHEN AND IBUPROFEN',
      dosage_form: 'TABLET',
      route: 'ORAL',
      active_ingredients: [
        {
          name: 'ACETAMINOPHEN',
          strength: '250MG',
        },
        {
          name: 'IBUPROFEN',
          strength: '125MG',
        },
      ],
      marketing_status: 'Over-the-counter',
    },
  ];

  constructor(
    private toggleMenuService: ToggleMenuService,
    private overlayMenuService: OverlayMenuService,
    private callService: CallService
  ) {
    this.toggleMenuSubscription = this.toggleMenuService
      .onToggleMenu()
      .subscribe((value) => this.toggleMenu(value));
    this.overlayMenuSubscription = this.overlayMenuService
      .onOverlayMenu()
      .subscribe((value) => this.toggleOverlay(value));
    this.callServiceSubscription = this.callService
      .onHandleError()
      .subscribe((error) => (this.errorMessage = error));
  }

  ngOnDestroy() {
    this.toggleMenuSubscription.unsubscribe();
    this.overlayMenuSubscription.unsubscribe();
    this.callServiceSubscription.unsubscribe();
  }

  toggleMenu(value: boolean): void {
    this.showMenu = value;
    this.sectionClass = value ? 'search' : 'search-nomenu';
    this.headerWidthFull = value ? false : true;
    window.innerWidth < 768
      ? (this.overlayMenu = true)
      : (this.overlayMenu = false);
    if (this.overlayMenu && this.showMenu) {
      this.sectionClass = 'search-nomenu menu-overlay';
      this.headerWidthFull = true;
    }
  }

  toggleOverlay(value: boolean): void {
    if (value) {
      this.overlayMenu = true;
      if (this.showMenu) {
        this.sectionClass = 'search-nomenu menu-overlay';
        this.headerWidthFull = true;
      }
    } else {
      this.overlayMenu = false;
      if (this.showMenu) {
        this.sectionClass = 'search';
        this.headerWidthFull = false;
      }
    }
  }

  handleFocus(): void {
    if (this.overlayMenu && this.showMenu) {
      this.overlayMenuService.setOverlayMenu(false);
      this.toggleMenuService.toggleMenu();
    }
  }

  updateResults(results: any[]): void {
    this.searchResults = results;
  }
}

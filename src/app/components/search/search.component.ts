import { Component, Input } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { OverlayMenuService } from '../../services/overlay-menu.service';
import { CallService } from '../../services/call.service';
import { Subscription } from 'rxjs';
import { SearchResult } from '../../types/SearchResult';

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
  private prevScrollpos: number = window.pageYOffset;
  public errorMessage: string | null = null;
  public sectionClass: string =
    window.innerWidth < 768 ? 'search-nomenu' : 'search';
  public headerWidthFull: boolean = window.innerWidth < 768 ? true : false;
  @Input() searchResults: SearchResult[] = [
    {
        "sponsor_name": "BAYER",
        "brand_name": "ALEVE-D SINUS & COLD",
        "dosage_form": "TABLET, EXTENDED RELEASE",
        "route": "ORAL",
        "active_ingredients": [
            {
                "name": "NAPROXEN SODIUM",
                "strength": "220MG"
            },
            {
                "name": "PSEUDOEPHEDRINE HYDROCHLORIDE",
                "strength": "120MG **Federal Register determination that product was not discontinued or withdrawn for safety or effectiveness reasons**"
            }
        ],
        "marketing_status": "Discontinued",
        "application_number": "NDA021076"
    },
    {
        "sponsor_name": "PERRIGO",
        "brand_name": "NAPROXEN SODIUM AND PSEUDOEPHEDRINE HYDROCHLORIDE",
        "dosage_form": "TABLET, EXTENDED RELEASE",
        "route": "ORAL",
        "active_ingredients": [
            {
                "name": "NAPROXEN SODIUM",
                "strength": "220MG"
            },
            {
                "name": "PSEUDOEPHEDRINE HYDROCHLORIDE",
                "strength": "120MG"
            }
        ],
        "marketing_status": "Over-the-counter",
        "application_number": "ANDA076518"
    },
    {
        "sponsor_name": "BIONPHARMA INC",
        "brand_name": "NAPROXEN SODIUM",
        "dosage_form": "CAPSULE",
        "route": "ORAL",
        "active_ingredients": [
            {
                "name": "NAPROXEN SODIUM",
                "strength": "EQ 200MG BASE"
            }
        ],
        "marketing_status": "Over-the-counter",
        "application_number": "NDA021920"
    },
    {
        "sponsor_name": "BAYER",
        "brand_name": "ALEVE",
        "dosage_form": "TABLET",
        "route": "ORAL",
        "active_ingredients": [
            {
                "name": "NAPROXEN SODIUM",
                "strength": "220MG"
            }
        ],
        "marketing_status": "Over-the-counter",
        "application_number": "NDA020204"
    },
    {
        "sponsor_name": "BAYER HLTHCARE",
        "brand_name": "ALEVE PM",
        "dosage_form": "TABLET",
        "route": "ORAL",
        "active_ingredients": [
            {
                "name": "DIPHENHYDRAMINE HYDROCHLORIDE",
                "strength": "25MG"
            },
            {
                "name": "NAPROXEN SODIUM",
                "strength": "220MG"
            }
        ],
        "marketing_status": "Over-the-counter",
        "application_number": "NDA205352"
    },
    {
        "sponsor_name": "PERRIGO PHARMA INTL",
        "brand_name": "DICLOFENAC SODIUM",
        "dosage_form": "GEL",
        "route": "TOPICAL",
        "active_ingredients": [
            {
                "name": "DICLOFENAC SODIUM",
                "strength": "1%"
            }
        ],
        "marketing_status": "Over-the-counter",
        "application_number": "ANDA211253"
    }
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

  handleScroll(): void {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      document.getElementById('search-container')!.style.marginTop = '0';
    } else {
      document.getElementById('search-container')!.style.marginTop = '-113px';
    }
    this.prevScrollpos = currentScrollPos;
  }
}

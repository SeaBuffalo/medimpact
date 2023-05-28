import { Component, Input } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { OverlayMenuService } from '../../services/overlay-menu.service';
import { CallService } from '../../services/call.service';
import { Subscription } from 'rxjs';
import { SearchResult } from '../../types/SearchResult';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { pageLoadData } from '../../../pageLoadData';
import { FilterMenuOptions } from '../../types/FilterMenuOptions';
import { fadeIn } from '../../utils/fadeInAnimation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [fadeIn]
})
export class SearchComponent {
  private showMenu: boolean = window.innerWidth < 768 ? false : true;
  private overlayMenu: boolean = window.innerWidth < 768 ? true : false;
  private toggleMenuSubscription!: Subscription;
  private overlayMenuSubscription!: Subscription;
  private callServiceSubscription!: Subscription;
  private prevScrollpos: number = window.pageYOffset;
  public scrollClose = false;
  public errorMessage: string | null = null;
  public sectionClass: string =
    window.innerWidth < 768 ? 'search-nomenu' : 'search';
  public headerWidthFull: boolean = window.innerWidth < 768 ? true : false;
  public faChevronDown = faChevronDown;
  public filterMenuOpen: boolean = false;
  public filterMenuOptions: FilterMenuOptions = {
    search_by: 'all',
    distribution: 'all',
    administration: 'all',
    results: '10',
  };
  public loading: boolean = false;
  @Input() searchResults: SearchResult[] = pageLoadData;

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
    if (this.prevScrollpos > currentScrollPos || currentScrollPos < 100) {
      document.getElementById('search-container')!.style.marginTop = '0';
      this.scrollClose = false;
    } else {
      document.getElementById('search-container')!.style.marginTop = '-175px';
      this.scrollClose = true;
    }
    this.prevScrollpos = currentScrollPos;
  }

  toggleFilterMenu(): void {
    this.filterMenuOpen = !this.filterMenuOpen;
  }

  updateFilterMenuOptions(event: FilterMenuOptions): void {
    this.filterMenuOptions = event;
  }

  handleLoading(event: boolean): void {
    this.loading = event;
  }
}

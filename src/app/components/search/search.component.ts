import { Component } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { OverlayMenuService } from '../../services/overlay-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  showMenu: boolean = window.innerWidth < 768 ? false : true;
  overlayMenu: boolean = window.innerWidth < 768 ? true : false;
  sectionClass: string = window.innerWidth < 768 ? 'search-nomenu' : 'search';
  headerWidthFull: boolean = window.innerWidth < 768 ? true : false;
  toggleMenuSubscription!: Subscription;
  overlayMenuSubscription!: Subscription;
  searchResults: any[] = [];

  constructor(
    private toggleMenuService: ToggleMenuService,
    private overlayMenuService: OverlayMenuService
  ) {
    this.toggleMenuSubscription = this.toggleMenuService
      .onToggleMenu()
      .subscribe((value) => this.toggleMenu(value));
    this.overlayMenuSubscription = this.overlayMenuService
      .onOverlayMenu()
      .subscribe((value) => this.toggleOverlay(value));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.toggleMenuSubscription.unsubscribe();
    this.overlayMenuSubscription.unsubscribe();
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

  handleClick(): void {
    if (this.overlayMenu && this.showMenu) {
      this.overlayMenuService.setOverlayMenu(false);
      this.toggleMenuService.toggleMenu();
    }
  }

  handleFocus(): void {
    if (this.overlayMenu && this.showMenu) {
      this.overlayMenuService.setOverlayMenu(false);
      this.toggleMenuService.toggleMenu();
    }
  }
}

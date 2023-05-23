import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { OverlayMenuService } from '../../services/overlay-menu.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private apiurl = 'https://api.fda.gov/drug/drugsfda.json?';
  private showMenu: boolean = window.innerWidth < 768 ? false : true;
  private overlayMenu: boolean = window.innerWidth < 768 ? true : false;
  private toggleMenuSubscription!: Subscription;
  private overlayMenuSubscription!: Subscription;
  public sectionClass: string =
    window.innerWidth < 768 ? 'search-nomenu' : 'search';
  public headerWidthFull: boolean = window.innerWidth < 768 ? true : false;
  public searchResults: any[] = [];

  constructor(
    private toggleMenuService: ToggleMenuService,
    private overlayMenuService: OverlayMenuService,
    private http: HttpClient
  ) {
    this.toggleMenuSubscription = this.toggleMenuService
      .onToggleMenu()
      .subscribe((value) => this.toggleMenu(value));
    this.overlayMenuSubscription = this.overlayMenuService
      .onOverlayMenu()
      .subscribe((value) => this.toggleOverlay(value));
  }

  ngOnInit() {
    this.getDrugs().subscribe((data) => {
      console.log(data)
      this.searchResults = [];
      data.results.forEach((result: any) => {
        result.products.forEach((product: any) => {
          this.searchResults.push(product.brand_name);
        });
      });
    });
  }

  ngOnDestroy() {
    this.toggleMenuSubscription.unsubscribe();
    this.overlayMenuSubscription.unsubscribe();
  }

  getDrugs(query?: string): Observable<any> {
    const url = `${this.apiurl}${query ? `search=${query}` : ''}&limit=10`;
    return this.http.get<any>(url);
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
}

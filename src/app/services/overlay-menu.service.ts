import { Injectable } from '@angular/core';
import { ToggleMenuService } from './toggle-menu.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayMenuService {
  public overlayMenu: boolean = window.innerWidth < 768 ? true : false;
  private overlaySubject = new Subject<any>();

  constructor(private toggleMenuService: ToggleMenuService) {}

  setOverlayMenu(value: boolean): void {
    //if input value is true and menu is showing, or vice versa, toggle menu as this means screen breakpoint has been crossed
    if (
      (value && this.toggleMenuService.showMenu) ||
      (!value && !this.toggleMenuService.showMenu)
    ) {
      this.toggleMenuService.toggleMenu();
    }
    this.overlayMenu = value;
    this.overlaySubject.next(this.overlayMenu);
  }

  onOverlayMenu(): Observable<any> {
    return this.overlaySubject.asObservable();
  }
}
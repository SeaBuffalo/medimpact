import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {
  showMenu: boolean = window.innerWidth < 768 ? false : true;
  private toggleSubject = new Subject<any>();

  constructor() { }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.toggleSubject.next(this.showMenu);
  }

  onToggleMenu(): Observable<any> {
    return this.toggleSubject.asObservable();
  }
}

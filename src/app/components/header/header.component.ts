import { Component } from '@angular/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faBars = faBars;
  showMenu: boolean = true;

  constructor(private toggleMenuService: ToggleMenuService) {}

  toggleShowMenu(): void {
    this.toggleMenuService.toggleMenu();
  }
}

import { Component } from '@angular/core';
import { OverlayMenuService } from './services/overlay-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'medimpact';

  constructor(private overlayMenuService: OverlayMenuService) {}

  handleResize(event: Event) {
    //if window is resized to less than 768px and overlay is not active, set overlay to active, otherwise if window is resized to more than 768px and overlay is active, set overlay to inactive
    const target = event.target as Window;
    if (target.innerWidth < 768 && !this.overlayMenuService.overlayMenu) {
      this.overlayMenuService.setOverlayMenu(true);
    } else if (
      target.innerWidth >= 768 &&
      this.overlayMenuService.overlayMenu
    ) {
      this.overlayMenuService.setOverlayMenu(false);
    }
  }
}

import { TestBed } from '@angular/core/testing';

import { OverlayMenuService } from './overlay-menu.service';

describe('OverlayMenuService', () => {
  let service: OverlayMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { SearchComponent } from './components/search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FontAwesomeModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        PrescriptionsComponent,
        SearchComponent,
        SearchBarComponent,
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'medimpact'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Medimpact');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'medimpact app is running!'
    );
  });
});

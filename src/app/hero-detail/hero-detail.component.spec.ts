import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { click } from 'src/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class Page {
  // getter properties wait to query the DOM until called.
  get buttons()     { return this.queryAll<HTMLButtonElement>('button'); }
  get saveBtn()     { return this.buttons[0]; }
  get nameDisplay() { return this.query<HTMLElement>('h2'); }
  get nameInput()   { return this.query<HTMLInputElement>('input'); }

  constructor(private fixture: ComponentFixture<HeroDetailComponent>) {
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }

  updateValueOfNameInput(newValue: string) {
    this.nameInput.value = newValue;
    this.nameInput.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }
}

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let page: Page;

  let heroService;

  beforeEach(async(() => {
    const mockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    mockHeroService.updateHero.and.returnValue(of({}));
    mockHeroService.getHero.and.returnValue(of({
      id: 1, name: 'testHero'
    }));

    const mockLocation = {
      back: jasmine.createSpy('back')
    };

    const activatedRouteStub = new ActivatedRouteStub({ id: '1' });

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);

    // 1st change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched hero
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update title when user enters new hero name', () => {
    page.updateValueOfNameInput('New Hero');

    const nameDisplay: HTMLElement = page.nameDisplay;
    expect(nameDisplay.textContent).toBe('NEW HERO Details');
  });

  it('should update hero name via service when user selects to save it', () => {
    heroService = TestBed.get(HeroService);

    page.updateValueOfNameInput('New Hero');

    const saveButton = page.saveBtn;
    click(saveButton);
    expect(heroService.updateHero).toHaveBeenCalledWith({ id: 1, name: 'New Hero' });
  });
});

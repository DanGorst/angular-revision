import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { By } from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update title when user enters new hero name', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const nameDisplay: HTMLElement = fixture.nativeElement.querySelector('h2');

    nameInput.value = 'New Hero';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('NEW HERO Details');
  });

  it('should update hero name via service when user selects to save it', () => {
    heroService = TestBed.get(HeroService);

    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const saveButton = fixture.debugElement.query(By.css('#save-button'));

    nameInput.value = 'New Hero';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    saveButton.triggerEventHandler('click', null);
    expect(heroService.updateHero).toHaveBeenCalledWith({ id: 1, name: 'New Hero' });
  });
});

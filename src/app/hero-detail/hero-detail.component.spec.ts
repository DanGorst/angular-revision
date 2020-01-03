import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  let mockHeroService;
  let updateHeroesSpy;
  let getHeroSpy;

  let mockLocation;

  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    updateHeroesSpy = mockHeroService.updateHero.and.returnValue(of({}));
    getHeroSpy = mockHeroService.getHero.and.returnValue(of({
      id: 1, name: 'testHero'
    }));

    mockLocation = {
      back: jasmine.createSpy('back')
    };

    activatedRouteStub = new ActivatedRouteStub({ id: '1' });

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
});

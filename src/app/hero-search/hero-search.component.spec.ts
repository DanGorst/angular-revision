import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  let heroService: HeroService;

  beforeEach(async(() => {
    const mockHeroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    mockHeroService.searchHeroes.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [
        HeroSearchComponent,
        RouterLinkDirectiveStub
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    heroService = TestBed.get(HeroService);
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce keystrokes before making call to service', fakeAsync(() => {
    component.search('te');
    tick(100);
    expect(heroService.searchHeroes).not.toHaveBeenCalled();
    tick(201);
    expect(heroService.searchHeroes).toHaveBeenCalledWith('te');
  }));
});

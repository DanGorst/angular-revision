import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  let mockHeroService;
  let searchHeroesSpy;

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    searchHeroesSpy = mockHeroService.searchHeroes.and.returnValue(of([]));

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
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

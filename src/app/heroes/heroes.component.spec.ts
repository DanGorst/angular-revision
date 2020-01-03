import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  let mockHeroService;

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    mockHeroService.getHeroes.and.returnValue(of([]));
    mockHeroService.addHero.and.returnValue(of({
      id: 1, name: 'testHero'
    }));
    mockHeroService.deleteHero.and.returnValue(of({}));

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
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
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

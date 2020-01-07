import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

@Component({selector: 'app-hero-search', template: ''})
class AppHeroSearchStubComponent { }

@Component({selector: 'app-simple-spinner', template: ''})
class AppSimpleSpinnerStubComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockHeroService;

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    const testHero = { id: 1, name: 'Test Hero 1' };
    mockHeroService.getHeroes.and.returnValue(of([testHero]));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        AppHeroSearchStubComponent,
        AppSimpleSpinnerStubComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display available heroes', () => {
    const heroElements = fixture.nativeElement.querySelectorAll('.hero');
    expect(heroElements.length).toBe(1);
    expect(heroElements[0].textContent).toEqual('Test Hero 1');
  });

  it('should display no heroes when none are available', () => {
    mockHeroService.getHeroes.and.returnValue(of([]));
    component.getHeroes();
    fixture.detectChanges();

    const heroElements = fixture.nativeElement.querySelectorAll('.hero');
    expect(heroElements.length).toBe(0);
  });
});

import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

@Component({selector: 'app-hero-search', template: ''})
class AppHeroSearchStubComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockHeroService;

  beforeEach(async(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        AppHeroSearchStubComponent,
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
});

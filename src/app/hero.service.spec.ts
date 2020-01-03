import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      { provide: HttpClient, useClass: HttpTestingController }
    ]
  }));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});

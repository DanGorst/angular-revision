import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HeroService ]
    });
    service = TestBed.get(HeroService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should make call to expected URL and return data', () => {
      const testData: Hero[] = [
        { id: 1, name: 'TestHero1' }
      ];

      service.getHeroes()
        .subscribe(data =>
          // When observable resolves, result should match test data
          expect(data).toEqual(testData)
        );

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpMock.expectOne('api/heroes');

      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(testData);
    });

    it('should return empty array if server returns error', () => {
      const errorMessage = 'Server error';

      service.getHeroes()
        .subscribe(data => expect(data).toEqual([]));

      const req = httpMock.expectOne('api/heroes');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Error' });
    });
  });

  describe('addHero', () => {
    it('should correctly call server to add hero', () => {
      const testHero = { id: 1, name: 'TestHero1' };

      service.addHero(testHero).subscribe(newHero => expect(newHero).toEqual(testHero));

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testHero);

      req.flush(testHero);
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { RemoteMovieService } from './remote-movie.service';

describe('RemoteMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoteMovieService = TestBed.get(RemoteMovieService);
    expect(service).toBeTruthy();
  });
});

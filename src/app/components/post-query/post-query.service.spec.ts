import { TestBed, inject } from '@angular/core/testing';

import { PostQueryService } from './post-query.service';

describe('PostQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostQueryService]
    });
  });

  it('should be created', inject([PostQueryService], (service: PostQueryService) => {
    expect(service).toBeTruthy();
  }));
});

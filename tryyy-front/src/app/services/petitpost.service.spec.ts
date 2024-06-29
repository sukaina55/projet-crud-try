import { TestBed } from '@angular/core/testing';

import { PetitpostService } from './petitpost.service';

describe('PetitpostService', () => {
  let service: PetitpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

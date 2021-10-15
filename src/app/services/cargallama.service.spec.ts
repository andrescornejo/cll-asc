import { TestBed } from '@angular/core/testing';

import { CargallamaService } from './cargallama.service';

describe('CargallamaService', () => {
  let service: CargallamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargallamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

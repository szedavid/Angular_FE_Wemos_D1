import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

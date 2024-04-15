import { TestBed } from '@angular/core/testing';

import { HallAdminService } from './hall-admin.service';

describe('HallAdminService', () => {
  let service: HallAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

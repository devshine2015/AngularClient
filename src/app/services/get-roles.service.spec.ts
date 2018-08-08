import { TestBed, inject } from '@angular/core/testing';

import { GetRolesService } from './get-roles.service';

describe('GetRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRolesService]
    });
  });

  it('should be created', inject([GetRolesService], (service: GetRolesService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { PartnerService } from './partner.service';

describe('PartnerService', () => {
  let service: PartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get 10 partner', async () => {
    const result = await service.searchPartners();
    expect(result.partners.length).toEqual(10);
  });
});

import { Injectable } from '@angular/core';
import { Partner } from '../../types/partner.interface';
import { faker } from '@faker-js/faker';
import { GetPartnerOptions } from './get-partner-options.interface';
import { SearchPartnersResult } from './search-partners-result.interface';
import { defaultOptions } from './search-partners-default-options';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private partners: Partner[] = [];

  constructor() {
    this.initPartners();
  }

  public async searchPartners(options: Partial<GetPartnerOptions> = {}): Promise<SearchPartnersResult> {
    const { searchString, take, skip } = { ...defaultOptions, ...options };
    const matchingPartner = this.partners.filter(partner => {
      return partner.name.toLowerCase().includes(searchString.toLowerCase());
    });

    return {
      totalFound: matchingPartner.length,
      partners: matchingPartner.slice(skip, skip + take),
    };
  }

  private initPartners(): void {
    for (let i = 0; i < 1_000; i++) {
      this.partners.push(this.generatePartner());
    }
  }

  private generatePartner(): Partner {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
    };
  }
}



import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Partner } from '../../types/partner.interface';
import { GetPartnerOptions } from './get-partner-options.interface';
import { defaultOptions } from './search-partners-default-options';
import { SearchPartnersResult } from './search-partners-result.interface';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private partners: Partner[] = [];

  constructor() {
    this.initPartners();
  }

  public async searchPartners(
    options: Partial<GetPartnerOptions> = {}
  ): Promise<SearchPartnersResult> {
    const { searchString, take, skip } = { ...defaultOptions, ...options };
    let matchingPartner = this.partners.filter((partner) => {
      return partner.name.toLowerCase().includes(searchString.toLowerCase());
    });

    if (options.sort) {
      matchingPartner = this.sortResults(matchingPartner, options.sort);
    }

    if (options.sortDirection === 'desc') {
      matchingPartner = matchingPartner.reverse();
    }

    return {
      totalFound: matchingPartner.length,
      partners: matchingPartner.slice(skip, skip + take),
    };
  }

  private initPartners(): void {
    this.partners = Array.apply(null, Array(10_000)).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
    }));
  }

  private sortResults(arr: Partner[], name: string): Partner[] {
    return arr.sort((a: Partner, b: Partner) => {
      const fistValue = a[name as keyof Partner];
      const secondValue = b[name as keyof Partner];
      if (fistValue < secondValue) return -1;
      if (fistValue > secondValue) return 1;
      return 0;
    });
  }
}

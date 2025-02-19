import { SortDirection } from '@angular/material/sort';

export interface GetPartnerOptions {
  searchString: string;
  skip: number;
  take: number;
  sort: string;
  sortDirection: SortDirection;
}

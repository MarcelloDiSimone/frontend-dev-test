import { DataSource } from '@angular/cdk/collections';
import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { from, merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Partner } from '../../types/partner.interface';
import { PartnerService } from './partner.service';
import { SearchPartnersResult } from './search-partners-result.interface';

@Injectable({
  providedIn: 'root',
})
export class PartnerSource extends DataSource<Partner> {
  data = signal<Partner[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  database: PartnerService | undefined;
  filterQuery: FormControl<string | null> | undefined;
  resultsLength = signal(0);
  constructor() {
    super();
  }
  connect(): Observable<Partner[]> {
    if (this.paginator && this.sort && this.database && this.filterQuery) {
      return merge(
        this.paginator.page,
        this.sort.sortChange,
        this.filterQuery.valueChanges
      ).pipe(
        startWith({}),
        switchMap(() => {
          return from(
            this.database!.searchPartners({
              searchString: this.filterQuery!.value || '',
              skip: this.paginator!.pageIndex * this.paginator!.pageSize,
              take: this.paginator!.pageSize,
              sort: this.sort!.active,
              sortDirection: this.sort!.direction,
            })
          ).pipe(
            catchError(() => observableOf({ partners: [], totalFound: 0 })),
            map((data: SearchPartnersResult) => {
              this.resultsLength.set(data.totalFound);
              this.data.set(data.partners);
              return data.partners;
            })
          );
        })
      );
    } else {
      throw Error(
        'Please set the paginator, sort and database on the data source before connecting.'
      );
    }
  }

  disconnect(): void {}
}

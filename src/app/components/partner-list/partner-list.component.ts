import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ExportService } from '../../services/export/export.service';
import { PartnerSource } from '../../services/partner/partner.datasource';
import { PartnerService } from '../../services/partner/partner.service';
import { Partner } from '../../types/partner.interface';

interface FilterForm {
  filterQuery: FormControl<string | null>;
}

@Component({
  selector: 'app-partner-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './partner-list.component.html',
  standalone: true,
  styleUrl: './partner-list.component.scss',
})
export class PartnerListComponent {
  private readonly partnerService = inject(PartnerService);
  private readonly exportService = inject(ExportService);
  private readonly dataSource = inject(PartnerSource);

  private readonly paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly sort = viewChild.required<MatSort>(MatSort);
  private readonly table = viewChild.required<MatTable<Partner>>(MatTable);

  displayedColumns: string[] = ['select', 'id', 'name'];
  displayCount: number[] = [10, 25, 50, 100];

  selection = new SelectionModel<Partner>(true, []);

  formGroup = new FormGroup<FilterForm>({
    filterQuery: new FormControl(''),
  });

  resultLength = signal(0);
  perPageCount = this.displayCount.shift();

  constructor() {
    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.filterQuery = this.formGroup.controls.filterQuery;
      this.dataSource.sort = this.sort();
      this.dataSource.database = this.partnerService;
      this.resultLength.set(this.dataSource.resultsLength());

      this.table().dataSource = this.dataSource;
    });
  }

  isAllSelected(): boolean {
    const selected = this.dataSource
      .data()
      .filter((row) => this.selection.isSelected(row));
    return selected.length === this.dataSource.data().length;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data());
  }

  export() {
    this.exportService.createExport({
      allSelected: false,
      selectedIds: [...this.selection.selected],
    });
  }

  exportAll() {
    this.exportService.createExport({
      allSelected: true,
      searchString: this.formGroup.controls.filterQuery.value || '',
      deselectedIds: [],
    });
  }
}

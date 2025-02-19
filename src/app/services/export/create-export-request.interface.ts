import { Partner } from '../../types/partner.interface';

export type CreateExportRequest = AllSelected | ManualSelected;

export interface AllSelected {
  allSelected: true;
  searchString: string;
  deselectedIds: Partner[];
}

export interface ManualSelected {
  allSelected: false;
  selectedIds: Partner[];
}

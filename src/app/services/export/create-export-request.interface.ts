export type CreateExportRequest = AllSelected | ManualSelected;


export interface AllSelected {
  allSelected: true;
  searchString: string;
  deselectedIds: string;
}

export interface ManualSelected {
  allSelected: false;
  selectedIds: string;
}

import { inject, Injectable } from '@angular/core';
import { CreateExportRequest } from './create-export-request.interface';
import { PartnerService } from '../partner/partner.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private readonly partnerService = inject(PartnerService);

  public async createExport(req: CreateExportRequest): Promise<void> {
    if (req.allSelected) {
      const { totalFound } = await this.partnerService.searchPartners({ searchString: req.searchString });
      console.log(`export ${totalFound - req.deselectedIds.length} partners.`);
    } else {
      console.log(`export ${req.selectedIds.length} partners.`);
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { PartnerService } from '../../services/partner/partner.service';

@Component({
  selector: 'app-partner-list',
  imports: [],
  templateUrl: './partner-list.component.html',
  standalone: true,
  styleUrl: './partner-list.component.scss'
})
export class PartnerListComponent implements OnInit{
  private readonly partnerService = inject(PartnerService);

  async ngOnInit(): Promise<void> {
    const resp = await this.partnerService.searchPartners({searchString: 'inc'});
    console.log(resp);
  }



}

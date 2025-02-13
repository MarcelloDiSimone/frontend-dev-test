import { Partner } from '../types/partner.interface';

export interface SearchPartnersResult {
  totalFound: number;
  partners: Partner[];
}

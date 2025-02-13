import { Component } from '@angular/core';
import { PartnerListComponent } from './components/partner-list/partner-list.component';

@Component({
  selector: 'app-root',
  imports: [PartnerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-dev-test';
}

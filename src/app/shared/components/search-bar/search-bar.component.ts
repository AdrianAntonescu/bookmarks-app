import { Component } from '@angular/core';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private searchService: SearchService) {}

  public onSearchTermChange(value: string): void {
    this.searchService.setSearchTerm(value);
  }
}

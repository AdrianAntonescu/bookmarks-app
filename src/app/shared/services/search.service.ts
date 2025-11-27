import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { BehaviorSubject } from 'rxjs';

import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private fuse!: Fuse<Bookmark>;
  private searchTerm$ = new BehaviorSubject<string>('');

  public searchTermObservable$ = this.searchTerm$.asObservable();

  public setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }

  public fuzzySearch(term: string, bookmarks: Bookmark[]): Bookmark[] {
    if (term.trim() === '') {
      return [];
    }

    this.fuse = new Fuse(bookmarks, {
      keys: ['name', 'url'],
      threshold: 0.4,
    });

    return this.fuse.search(term).map((result) => result.item);
  }
}

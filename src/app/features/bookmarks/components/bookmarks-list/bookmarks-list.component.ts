import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { Bookmark, GroupedBookmarks } from '../../../../shared/models/bookmark';
import { normalizeDate } from '../../../../utils/date.helper';
import { BookmarksService } from '../../bookmarks.service';
import { AppState } from '../../../../app.state';
import { selectSortedBookmarks } from '../../store/bookmarks.selectors';
import { SearchService } from '../../../../shared/services/search.service';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
})
export class BookmarksListComponent implements OnInit {
  public groupedBookmarks$!: Observable<GroupedBookmarks>;
  public filteredBookmarks$!: Observable<Bookmark[]>;

  constructor(
    private bookmarksService: BookmarksService,
    private store: Store<AppState>,
    public searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadBookmarksIfStoreIsEmpty();
    this.initializeGroupedBookmarksStream();
    this.initializeFilteredBookmarksStream();
  }

  public isBookmarksListPopulated(groupedBookmarks: GroupedBookmarks): boolean {
    if (!groupedBookmarks) {
      return false;
    }

    return Object.values(groupedBookmarks).some(
      (bookmarks: Bookmark[]) => bookmarks.length > 0
    );
  }

  private initializeFilteredBookmarksStream(): void {
    this.filteredBookmarks$ = combineLatest([
      this.store.select(selectSortedBookmarks),
      this.searchService.searchTermObservable$,
    ]).pipe(
      map(([bookmarks, term]) => {
        if (!term) return bookmarks;
        return this.searchService.fuzzySearch(term, bookmarks);
      })
    );
  }

  private initializeGroupedBookmarksStream(): void {
    this.groupedBookmarks$ = this.store
      .select(selectSortedBookmarks)
      .pipe(map((bookmarks: Bookmark[]) => this.groupBookmarks(bookmarks)));
  }

  private loadBookmarksIfStoreIsEmpty(): void {
    this.store
      .select(selectSortedBookmarks)
      .pipe(take(1))
      .subscribe((bookmarks: Bookmark[]) => {
        if (!bookmarks || bookmarks.length === 0) {
          this.bookmarksService.loadBookmarks();
        }
      });
  }

  private groupBookmarks(bookmarks: Bookmark[]): GroupedBookmarks {
    const groupedBookmarks: GroupedBookmarks = {
      today: [],
      yesterday: [],
      older: [],
    };
    const normalizedToday = normalizeDate(new Date());
    const normalizedYesterday = normalizeDate(
      new Date(normalizedToday.getTime() - 1000 * 60 * 60 * 24)
    ); // subtract 1 day in milliseconds

    bookmarks.forEach((bookmark: Bookmark) => {
      const normalizedBookmarkDate = normalizeDate(
        new Date(bookmark.updatedAt)
      );

      if (normalizedBookmarkDate.getTime() === normalizedToday.getTime()) {
        groupedBookmarks.today.push(bookmark);
      } else if (
        normalizedBookmarkDate.getTime() === normalizedYesterday.getTime()
      ) {
        groupedBookmarks.yesterday.push(bookmark);
      } else {
        groupedBookmarks.older.push(bookmark);
      }
    });

    return groupedBookmarks;
  }
}

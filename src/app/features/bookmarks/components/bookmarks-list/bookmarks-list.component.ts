import { Component } from '@angular/core';
import { Bookmark, GroupedBookmarks } from 'src/app/shared/models/bookmark';
import { BookmarksService } from '../../bookmarks.service';
import { map, Observable } from 'rxjs';
import { normalizeDate } from 'src/app/utils/date.helper';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss'],
})
export class BookmarksListComponent {
  public groupedBookmarks$: Observable<GroupedBookmarks> = this.bookmarksService
    .getBookmarks()
    .pipe(map((bookmarks: Bookmark[]) => this.groupBookmarks(bookmarks)));

  constructor(private bookmarksService: BookmarksService) {}

  private groupBookmarks(bookmarks: Bookmark[]): GroupedBookmarks {
    const groupedBookmarks: GroupedBookmarks = { today: [], yesterday: [], older: [] };
    const normalizedToday = normalizeDate(new Date());
    const normalizedYesterday = normalizeDate(new Date(normalizedToday.getTime() - 1000 * 60 * 60 * 24)); // subtract 1 day in milliseconds

    bookmarks.forEach((bookmark: Bookmark) => {
      const normalizedBookmarkDate = normalizeDate(new Date(bookmark.updatedAt));

      if (normalizedBookmarkDate.getTime() === normalizedToday.getTime()) {
        groupedBookmarks.today.push(bookmark);
      } else if (normalizedBookmarkDate.getTime() === normalizedYesterday.getTime()) {
        groupedBookmarks.yesterday.push(bookmark);
      } else {
        groupedBookmarks.older.push(bookmark);
      }
    });

    return groupedBookmarks;
  }
}

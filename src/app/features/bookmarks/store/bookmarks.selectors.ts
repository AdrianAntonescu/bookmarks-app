import { createSelector } from '@ngrx/store';

import { AppState } from '../../../app.state';
import { Bookmark } from '../../../shared/models/bookmark';

export const selectBookmarks = (state: AppState) => state.bookmark;

export const selectSortedBookmarks = createSelector(
  selectBookmarks,
  (bookmarks: Bookmark[]) => {
    return [...bookmarks].sort((bookmark1: Bookmark, bookmark2: Bookmark) => {
      return (
        new Date(bookmark2.updatedAt).getTime() -
        new Date(bookmark1.updatedAt).getTime()
      );
    });
  }
);

export const selectBookmarkById = (id: string) =>
  createSelector(selectSortedBookmarks, (bookmarks: Bookmark[]) =>
    bookmarks.find((bookmark: Bookmark) => bookmark.id === id)
  );

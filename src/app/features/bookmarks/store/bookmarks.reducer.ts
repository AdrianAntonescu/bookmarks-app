import { createReducer, on } from '@ngrx/store';

import {
  addBookmark,
  loadBookmarks,
  updateBookmark,
} from './bookmarks.actions';
import { Bookmark } from '../../../shared/models/bookmark';

export const initialState: Bookmark[] = [];

export const bookmarkReducer = createReducer(
  initialState,
  on(addBookmark, (state, { bookmark }) => [...state, bookmark]),
  on(updateBookmark, (state, { updatedBookmark }) =>
    state.map((bookmark) =>
      bookmark.id === updatedBookmark.id ? { ...updatedBookmark } : bookmark
    )
  ),
  on(loadBookmarks, (_, { bookmarks }) => [...bookmarks])
);

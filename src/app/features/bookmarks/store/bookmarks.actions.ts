import { createAction, props } from '@ngrx/store';

import { Bookmark } from '../../../shared/models/bookmark';

export const addBookmark = createAction(
  '[Bookmark] Add Bookmark',
  props<{ bookmark: Bookmark }>()
);

export const updateBookmark = createAction(
  '[Bookmark] Update Bookmark',
  props<{ updatedBookmark: Bookmark }>()
);

export const loadBookmarks = createAction(
  '[Bookmark] Load Bookmarks',
  props<{ bookmarks: Bookmark[] }>()
);

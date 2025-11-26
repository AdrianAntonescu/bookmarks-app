import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { Bookmark } from '../../shared/models/bookmark';
import {
  loadBookmarks,
  addBookmark,
  updateBookmark,
} from './store/bookmarks.actions';
import { AppState } from '../../app.state';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private apiUrl = `${environment.apiUrl}/bookmarks`;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  public loadBookmarks(): void {
    this.getBookmarks()
      .pipe(
        tap((bookmarks) => this.store.dispatch(loadBookmarks({ bookmarks }))),
        catchError((error) => {
          console.error('Error loading bookmarks:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  public getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  public addBookmark(bookmark: Bookmark): void {
    this.store.dispatch(addBookmark({ bookmark }));
  }

  public updateBookmark(updatedBookmark: Bookmark): void {
    this.store.dispatch(updateBookmark({ updatedBookmark }));
  }
}

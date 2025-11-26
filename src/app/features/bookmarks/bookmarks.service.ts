import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/shared/models/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  private apiUrl = `${environment.apiUrl}/bookmarks`;

  constructor(private http: HttpClient) { }

  public getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  public getBookmarkById(id: string): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.apiUrl}/${id}`);
  }

  public createBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.apiUrl, bookmark);
  }

  public updateBookmark(id: string, bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.apiUrl}/${id}`, bookmark);
  }
}

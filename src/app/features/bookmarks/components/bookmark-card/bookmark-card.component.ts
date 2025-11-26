import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from 'src/app/shared/models/bookmark';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss']
})
export class BookmarkCardComponent {
  @Input({required: true}) bookmark!: Bookmark;

  constructor(private router: Router) {}

  public goToEditBookmark(bookmarkId: string) {
    this.router.navigate(['/edit-bookmark', bookmarkId]);
  }
}

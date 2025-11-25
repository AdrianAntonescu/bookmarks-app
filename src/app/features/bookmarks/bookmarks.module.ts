import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarkCardComponent } from './components/bookmark-card/bookmark-card.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';



@NgModule({
  declarations: [
    BookmarksListComponent,
    BookmarkCardComponent,
    BookmarkFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookmarksListComponent
  ]
})
export class BookmarksModule { }

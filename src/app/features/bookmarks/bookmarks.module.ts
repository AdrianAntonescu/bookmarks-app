import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import { BookmarkCardComponent } from './components/bookmark-card/bookmark-card.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';

@NgModule({
  declarations: [
    BookmarksListComponent,
    BookmarkCardComponent,
    BookmarkFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [BookmarksListComponent],
})
export class BookmarksModule {}

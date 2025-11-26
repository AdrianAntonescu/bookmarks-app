import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookmarksListComponent } from './features/bookmarks/components/bookmarks-list/bookmarks-list.component';
import { BookmarkFormComponent } from './features/bookmarks/components/bookmark-form/bookmark-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/bookmarks', pathMatch: 'full' },
  // lazy loading is not needed in our context
  { path: 'bookmarks', component: BookmarksListComponent },
  { path: 'add-bookmark', component: BookmarkFormComponent },
  { path: 'edit-bookmark/:id', component: BookmarkFormComponent },
  { path: '**', redirectTo: '/bookmarks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

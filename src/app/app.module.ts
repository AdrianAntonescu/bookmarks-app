import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BookmarksModule } from './features/bookmarks/bookmarks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { bookmarkReducer } from './features/bookmarks/store/bookmarks.reducer';
import { AppState } from './app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BookmarksModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>({ bookmark: bookmarkReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

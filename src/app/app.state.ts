import { Bookmark } from './shared/models/bookmark';

export interface AppState {
  readonly bookmark: Bookmark[];
}

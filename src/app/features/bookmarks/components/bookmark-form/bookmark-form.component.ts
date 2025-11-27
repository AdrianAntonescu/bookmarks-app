import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';

import { Bookmark } from '../../../../shared/models/bookmark';
import { BookmarksService } from '../../bookmarks.service';
import { AppState } from '../../../../app.state';
import {
  selectBookmarkById,
  selectBookmarks,
} from '../../store/bookmarks.selectors';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent implements OnInit {
  private bookmarkId?: string;
  private originalBookmark?: Bookmark;

  public formType: 'create' | 'update' = 'create';
  public newBookmark: Bookmark = {
    id: crypto.randomUUID(),
    name: '',
    url: '',
    updatedAt: '',
  };
  public bookmarkForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookmarksService: BookmarksService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.setFormProperties();
    this.generateFormGroup();
  }

  private generateFormGroup(): void {
    this.bookmarkForm = this.formBuilder.group({
      name: [this.newBookmark.name, Validators.required],
      url: [
        this.newBookmark.url,
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)((localhost)|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))(:\d{1,5})?(\/[^\s]*)?$/
          ),
          this.uniqueUrlValidator(this.bookmarkId ?? this.newBookmark.id),
        ],
      ],
    });
  }

  private setFormProperties(): void {
    const url = this.route.snapshot.url
      .map((segment) => segment.path)
      .join('/');

    if (url.includes('edit-bookmark')) {
      this.formType = 'update';
      this.bookmarkId = this.route.snapshot.paramMap.get('id')!;
      this.newBookmark = {
        ...this.getBookmarkFromStore(this.bookmarkId),
      };
      this.originalBookmark = { ...this.newBookmark };
    } else {
      this.formType = 'create';
    }
  }

  private getBookmarkFromStore(bookmarkId: string): Bookmark {
    let bookmarkToEdit!: Bookmark;

    this.store
      .select(selectBookmarkById(bookmarkId))
      .pipe(take(1))
      .subscribe(
        (bookmark: Bookmark | undefined) => (bookmarkToEdit = bookmark!)
      );

    return bookmarkToEdit;
  }

  private uniqueUrlValidator(bookmarkId: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const url = control.value;
      let error: ValidationErrors | null = null;

      this.store
        .select(selectBookmarks)
        .pipe(take(1))
        .subscribe((bookmarks: Bookmark[]) => {
          const isUrlDuplicate = bookmarks.some(
            (bookmark: Bookmark) =>
              bookmark.url === url && bookmark.id !== bookmarkId
          );

          if (isUrlDuplicate) {
            error = { notUniqueUrl: true };
          }
        });

      return error;
    };
  }

  public onBookmarkFormSubmit(): void {
    if (this.bookmarkForm.valid) {
      this.newBookmark = {
        id: this.bookmarkId ?? this.newBookmark.id,
        updatedAt: new Date().toISOString(),
        ...this.bookmarkForm.value,
      };

      if (this.formType === 'update') {
        this.bookmarksService.updateBookmark(this.newBookmark);
      } else {
        this.bookmarksService.addBookmark(this.newBookmark);
      }

      this.router.navigate(['/bookmarks']);
    }
  }

  // can also be written as a helper function that takes the form group as an argument as well
  public getErrorMessage(formControlName: string): string {
    const formControl = this.bookmarkForm.get(formControlName);

    if (!formControl || !formControl.errors) {
      return '';
    }

    if (formControl.hasError('required')) {
      return 'Field is required';
    }

    if (formControl.hasError('pattern')) {
      return 'Invalid format - http(s)://example.com';
    }

    if (formControl.hasError('notUniqueUrl')) {
      return 'Bookmark with this URL is already saved';
    }

    return '';
  }

  public canUpdateBookmark(): boolean {
    if (this.formType === 'create') {
      return true;
    }

    return (
      JSON.stringify({
        name: this.originalBookmark?.name,
        url: this.originalBookmark?.url,
      }) !== JSON.stringify(this.bookmarkForm.value)
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Bookmark } from 'src/app/shared/models/bookmark';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent implements OnInit {
  public formType: 'create' | 'edit' = 'create';
  public newBookmark: Bookmark = {
    id: '',
    name: '',
    url: '',
    updatedAt: '',
  };
  public bookmarkForm: FormGroup = new FormGroup({});

  private bookmarkId?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getFormInformationFromRoute();
    this.generateFormGroup();
  }

  public onBookmarkFormSubmit(): void {
    if (this.bookmarkForm.valid) {
      this.newBookmark = {
        id: crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
        ...this.bookmarkForm.value,
      };
      console.log(this.newBookmark);
      this.router.navigate(['/bookmarks']);
    }
  }

  //can also be written as a helper function that takes the form group as an argument as well
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

    return '';
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
        ],
      ],
    });
  }

  private getFormInformationFromRoute(): void {
    const url = this.route.snapshot.url
      .map((segment) => segment.path)
      .join('/');

    if (url.includes('edit-bookmark')) {
      this.formType = 'edit';
      this.bookmarkId = this.route.snapshot.paramMap.get('id')!;
    } else {
      this.formType = 'create';
    }
  }
}

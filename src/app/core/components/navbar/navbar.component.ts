import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  goToAddBookmark() {
    this.router.navigate(['/add-bookmark']);
  }

  goToBookmarks() {
    this.router.navigate(['/bookmarks']);
  }
}

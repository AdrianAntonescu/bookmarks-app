# BookmarksApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Go to root path and install dependencies

```bash
npm install
```

Go to /server-mock path and run

```bash
node generate-db.js
```

You can now start the local server using

```bash
npx json-server db.json
```

And access it at http://localhost:3000

Open new terminal in root path and start the app using

```bash
ng serve --configuration=development
```

and open it on http://localhost:4200

## App description

The app is responsive and can be used in both web and mobile browsers.

The Bookmarker app lets you view, save and edit bookmarks of favourite websites.

You can view the bookmarks as a list and edit them one by one.

The list can be filtered using the fuzzy search option in the navbar.

Create/update bookmarks constraints:

- Both name and URL are required
- URL must have a valid format (e.g.: http(s)://example.com)
- URL must be unique in the list

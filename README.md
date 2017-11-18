# MyReads Project - James Maher

This project was setup with the starter template provided by Udacity.

The way to install the project is first to run `npm install` and then `npm start`. The project homepage will then open in a browser after a moment or two.

## Components
- **App.js**: controls routing and functions to be used in child components. Book shelf updates are maintained in local state for fast UI and also updated on server.
- **Home.js**: homepage, includes the three shelves with book components and props from main App. Book shelves persist with page refresh.
- **Search.js**: search page, includes books as components returned from `BookAPI.search` and filtered by user input. Also includes props from main App.
- **Book.js**: renders a book with control methods passed down as props. Changing a shelf on Search or Home will update the app state (and server), thus show the update on all views.
&nbsp;

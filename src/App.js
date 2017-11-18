import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Home from './Home';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    allBooks: {},
    ourBooks: {},
    currentlyReading: [],
    wantToRead: [],
    read: []
  };
  updateBookAPIandView = (e, book) => {
    //update View
    let shelfAddingTo = e.target.value || undefined;
    let shelfRemovingFrom = book.shelf || undefined;
    book.shelf = e.target.value || 'none';

    //only update the shelves in play
    if (shelfAddingTo === 'none') {
      this.setState({
        ...this.state,
        [shelfRemovingFrom]: this.state[shelfRemovingFrom].filter(el => {
          return el.id !== book.id;
        })
      });
    } else if (shelfRemovingFrom === undefined) {
      this.setState({
        ...this.state,
        [shelfAddingTo]: this.state[shelfAddingTo].concat(book)
      });
    } else {
      this.setState({
        ...this.state,
        [shelfAddingTo]: this.state[shelfAddingTo].concat(book),
        [shelfRemovingFrom]: this.state[shelfRemovingFrom].filter(el => {
          return el.id !== book.id;
        })
      });
    }
    //then update API
    BooksAPI.update(book, shelfAddingTo);
  };
  updateBookLists = () => {
    //set up state with our books and shelves
    BooksAPI.getAll().then(books => {
      this.setState({
        ourBooks: books,
        currentlyReading: books.filter(
          book => book.shelf === 'currentlyReading'
        ),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')
      });
    });
  };
  componentDidMount() {
    this.updateBookLists();
  }
  HomeWithProps = props => {
    return (
      <Home
        updateBook={this.updateBookAPIandView}
        currentlyReading={this.state.currentlyReading}
        wantToRead={this.state.wantToRead}
        read={this.state.read}
      />
    );
  };
  SearchWithProps = props => {
    return (
      <Search
        updateBook={this.updateBookAPIandView}
        allBooks={this.state.allBooks}
      />
    );
  };
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={this.HomeWithProps} />
          <Route exact path="/search" component={this.SearchWithProps} />
        </div>
      </Router>
    );
  }
}

export default BooksApp;

import React from 'react';
import Book from './Book';
import './App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends React.Component {
  state = {
    searchQuery: '',
    matchedBooks: {}
  };
  searchAPIwithTerm = searchQuery => {
    console.log(searchQuery)
    this.setState({ searchQuery: searchQuery });

    BooksAPI.search(searchQuery, 20).then(matchedBooks => {
      this.setState({
        matchedBooks: matchedBooks
      });
    });
  };
  render() {
    const { matchedBooks } = this.state;
    const { updateBook } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
          <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchQuery}
              onChange={event => this.searchAPIwithTerm(event.target.value)}
          />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {matchedBooks && matchedBooks.length > 0 &&
              matchedBooks.map(book => {
                return (
                  <Book
                    key={book.id}
                    onShelfUpdate={updateBook}
                    details={book}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import Book from './Book';
import './App.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = {};
  render() {
    const { updateBook, currentlyReading, wantToRead, read } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => {
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map(book => {
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(book => {
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
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;

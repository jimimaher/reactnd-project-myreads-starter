import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'
import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {
  state = {
    allBooks: {},
    ourBooks: {},
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false,
    searchQuery: ''
  }
  updateBookAPI = (e, book) => {
    let shelfAddingTo = e.target.value;
    let shelfRemovingFrom = book.shelf;

    //update the shelf
    book.shelf = e.target.value;
    
    this.setState({ 
      ...this.state,
      [shelfAddingTo]: this.state[shelfAddingTo].concat(book),
      [shelfRemovingFrom]: this.state[shelfRemovingFrom].filter((el) => {
        return el.id !== book.id
      })
    })

    BooksAPI.update(book, shelfAddingTo)
  }
  updateBookList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter( book => ( book.shelf === "currentlyReading" )),
        wantToRead: books.filter( book => ( book.shelf === "wantToRead" )),
        read: books.filter( book => ( book.shelf === "read" )),
      })
    })
  }
  componentDidMount (){
    this.updateBookList()

    //use this to update bookshelves
    BooksAPI.getAll().then((books) => {
      this.setState({
        ourBooks: books
      })
    })
  }
  updateSearchQuery = (searchQuery) => {
    this.setState({ searchQuery: searchQuery.trim() })
  }
  render() {
    let booksFound;
    const { searchQuery } = this.state
    
    if (searchQuery) {
      //show only those that match
      const match = new RegExp(escapeRegExp(searchQuery), 'i')
      booksFound = this.state.ourBooks.filter((book) => match.test(book.title))
    } else {
      //show all
      booksFound = this.state.ourBooks
    }

    return (
      <div className="app">

        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={ this.state.searchQuery }
                  onChange={(event) => this.updateSearchQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                    {
                      booksFound.length !== 0 && (
                        booksFound.map( book => {
                          return <Book key={book.id} 
                                      onShelfUpdate={ this.updateBookAPI } 
                                      details={book} 
                                  />
                        })
                      )
                    }
              </ol>
            </div>
          </div>
        ) : (
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
                      {
                        this.state.currentlyReading.map( book => {
                          return <Book key={book.id} 
                                       onShelfUpdate={ this.updateBookAPI } 
                                       details={book} 
                                  />
                        })
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.wantToRead.map( book => {
                          return <Book key={book.id} 
                                       onShelfUpdate={ this.updateBookAPI } 
                                       details={book} 
                                  />
                        })
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.state.read.map( book => {
                          return <Book key={book.id} 
                                       onShelfUpdate={ this.updateBookAPI } 
                                       details={book} 
                                  />
                        })
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

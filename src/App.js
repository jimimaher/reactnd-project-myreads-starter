import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import MockAPI from './mockBooks'
import './App.css'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    allBooks: {},
    ourBooks: {},
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false
  }
  setShowSearchPageBool = (boolShow = true) => {
    this.setState({
      showSearchPage: boolShow
    })
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
    if( this.state.ourBooks.length === undefined ){
      this.setState({
        ourBooks: MockAPI
      })
    }
  }

  render() {

    return (
      <div className="app">

        {this.state.showSearchPage ? (
          <Search 
            ourBooks={this.state.ourBooks}
            setShowSearchPageBool={this.setShowSearchPageBool}
          />
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
              <a onClick={() => this.setShowSearchPageBool(true)}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

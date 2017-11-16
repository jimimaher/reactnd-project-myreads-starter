import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MockAPI from './mockBooks'
import './App.css'
import Home from './Home'
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
          <Home 
            updateBookAPI={this.updateBookAPI}
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            setShowSearchPageBool={this.setShowSearchPageBool}
          />
        )}
      </div>
    )
  }
}

export default BooksApp

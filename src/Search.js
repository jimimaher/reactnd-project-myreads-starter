import React from 'react'
import Book from './Book'
import './App.css'
import escapeRegExp from 'escape-string-regexp'

class Search extends React.Component {
    state = {
        searchQuery: ''
    }
    updateSearchQuery = (searchQuery) => {
        this.setState({ searchQuery: searchQuery })
    }
    render() {
        let booksFound;
        const { searchQuery } = this.state
        const { ourBooks, setShowSearchPageBool } = this.props
        
        if (searchQuery) {
          //show only those that match
          const match = new RegExp(escapeRegExp(searchQuery), 'i')
          booksFound = ourBooks.filter((book) => match.test(book.title))
        } else {
          //show all
          booksFound = ourBooks
        }

        return (
          <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => setShowSearchPageBool(false)}>Close</a>
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
                    booksFound.length !== undefined && (
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
        )
    }
}

export default Search
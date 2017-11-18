import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'

class Book extends Component {
    render(){
        const { details, onShelfUpdate } = this.props;
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${details.imageLinks.smallThumbnail}` }}></div>
                        <div className="book-shelf-changer">
                            <select value={ details.shelf || 'none' } onChange={ (e) => onShelfUpdate(e, details) }>
                                <option value="moveTo" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ details.title }</div>
                    <div className="book-authors">
                        { details.authors.join(', ') }
                    </div>
                </div>
            </li>
        )
    }
}

export default Book
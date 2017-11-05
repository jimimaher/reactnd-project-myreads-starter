import React, { Component } from 'react'

class Book extends Component {
    render(){
        console.log('details: ' , this.props.details)
        const details = this.props.details;
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${details.imageLinks.smallThumbnail}` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{details.title}</div>
                    <div className="book-authors">
                        { details.authors.map( (author, i) => {
                            //add a comma if it's not the last author
                            return i !== details.authors.length-1 ? author + ', ' : author
                        }) }
                    </div>
                </div>
            </li>
        )
    }
}

export default Book
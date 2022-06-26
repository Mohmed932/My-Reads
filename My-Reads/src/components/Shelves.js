import React from 'react';
import Shelf from './Shelf';


const Shelves = ({books, Modernization}) => {

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const whatToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
        <div>
            <Shelf title="Currently Reading" books={currentlyReading} updateBookShelf={Modernization}/>
            <Shelf title="Want To Read" books={whatToRead} updateBookShelf={Modernization}/>
            <Shelf title="Read" books={read} updateBookShelf={Modernization}/>
        </div>
    )

}

export default Shelves;
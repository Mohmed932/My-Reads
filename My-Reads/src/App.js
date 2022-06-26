import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import AllBook from './components/AllBook'


const BooksApp = () => {
  const [Allbooks, setAllbooks] = useState([])
  const [toBooking, settoBooking] = useState(new Map());
  const [Search, setSearch] = useState("");
  const [SearchForTheBook, setSearchForTheBook] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);


  useEffect(() => {

    BooksAPI.getAll()
      .then(data => {
        setAllbooks(data)
        settoBooking(createListBooks(data))
        console.log(data)
      }
      );
  }, [])


  useEffect(() => {

    const allOfThem = SearchForTheBook.map(book => {
      if (toBooking.has(book.id)) {
        return toBooking.get(book.id);
      } else {
        return book;
      }
    })
    setMergedBooks(allOfThem);
  }, [toBooking, SearchForTheBook])

  useEffect(()=>{
    let isSearch = true
    if(Search){
      BooksAPI.search(Search).then(result=>{
        if(result.error){
          setSearchForTheBook([])
        }else{
          if(isSearch){
            setSearchForTheBook(result)
          }
        }
      })
    }
    return()=>{
      isSearch =true;
      setSearchForTheBook([])
    }
  },[Search])


  const createListBooks = (books) => {
    const maping = new Map();
    books.map(book => maping.set(book.id, book));
    return maping;
  }

  const Modernization = (book, goingto) => {
    const updatedBooks = Allbooks.map(booking => {
      if (booking.id === book.id) {
        book.shelf = goingto;
        return book;
      }
      return booking;
    })
    if (!toBooking.has(book.id)) {
      book.shelf = goingto;
      updatedBooks.push(book)
    }
    setAllbooks(updatedBooks);
    BooksAPI.update(book, goingto);
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/search" element={
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={Search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {mergedBooks.map(booking => (
                    <li key={booking.id}>
                      <AllBook book={booking} changeBookShelf={Modernization} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          }/>
          <Route path="/" element={
            <div className="list-books">
              <Nav />
              <div className="list-books-content">
                <Shelves books={Allbooks} Modernization={Modernization} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          }/>
        </Routes>
      </Router>
    </div>
  )

}

export default BooksApp

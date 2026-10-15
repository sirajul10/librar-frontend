import React, { useEffect, useState } from 'react';
import { baseurl } from '../services/BaseUrl';
import BooksCart from '../components/BooksCart';

const BrowseBooks = () => {
    const [books,setBooks] = useState([]);
        useEffect(()=>{
            fetch(`${baseurl}/books/all`).then(res=>res.json()).then(data=>setBooks(data))
        },[])
    return (
        <div>
            <h2 className='py-4 my-4'>All Books</h2>
            <div className='grid grid-cols-4 gap-4'>
                {
                    books.map((book)=>(
                        <BooksCart book={book} key={book.id}></BooksCart>
                    ))
                }
            </div>
        </div>
    );
};

export default BrowseBooks;
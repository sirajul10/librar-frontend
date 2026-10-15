import React, { useEffect, useState } from 'react';
import { baseurl } from '../services/BaseUrl';
import BooksCart from './BooksCart';

const FeatureBooks = () => {
    const [featureBooks,setFeatureBooks] = useState([]);
    useEffect(()=>{
        fetch(`${baseurl}/books/all`).then(res=>res.json()).then(data=>setFeatureBooks(data))
    },[])
    return (
        <div>
            <h2 className='text-center text-amber-700 text-3xl'>Our Feature Books</h2>
           <div className='grid grid-cols-3 gap-1 py-5 justify-self-center'>
            
            {
                featureBooks.slice(0,3).map((book)=>(
                    <BooksCart book={book} key={book.id} />
                ))
            }
           </div>
        </div>
    );
};

export default FeatureBooks;
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useParams } from 'react-router';
import { baseurl } from '../services/BaseUrl';
import toast from 'react-hot-toast';

const BooksDetails = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authUser, accessToken } = useContext(AuthContext);
    const { id } = useParams();
    const handleREserve = async()=>
    {
        const res = await fetch(`${baseurl}/reserve/${id}`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        const data = await res.json();
        if(data)
        {

        
        toast.success(data.message);
        }
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        setLoading(true);
        fetch(`${baseurl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBook(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[#F6F1E7] flex items-center justify-center">
                <p className="text-[#5A4E3E]">Loading book…</p>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen w-full bg-[#F6F1E7] flex items-center justify-center">
                <p className="text-[#5A4E3E]">Book not found.</p>
            </div>
        );
    }

    const availabilityPct = Math.max(
        4,
        Math.round((book.available_copies / book.total_copies) * 100)
    );

    return (
        <div
            className="min-h-screen w-full bg-[#F6F1E7] text-[#241C14] flex items-center justify-center p-6 md:p-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] overflow-hidden border border-[#241C14]/10">
                {/* Cover */}
                <div className="relative w-full md:h-full min-h-[320px] bg-[#E4CFA5]">
                    {book.cover_image ? (
                        <img
                            src={book.cover_image}
                            alt={`Cover of ${book.title}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="relative w-full h-full overflow-hidden bg-[#BB5C2C]">
                            {/* horizon + sun, faint */}
                            <svg
                                className="absolute inset-0 w-full h-full opacity-[0.16]"
                                viewBox="0 0 400 500"
                                preserveAspectRatio="xMidYMid slice"
                            >
                                <circle cx="200" cy="180" r="90" fill="#F6E9D8" />
                                <line x1="0" y1="300" x2="400" y2="300" stroke="#241C14" strokeWidth="2" />
                                <line x1="0" y1="330" x2="400" y2="330" stroke="#241C14" strokeWidth="1" />
                                <line x1="0" y1="352" x2="400" y2="352" stroke="#241C14" strokeWidth="1" />
                            </svg>

                            {/* frame */}
                            <div className="absolute inset-6 border border-[#F6E9D8]/40" />

                            {/* drop letter */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                    className="text-[13rem] leading-none text-[#F6E9D8] select-none"
                                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                                >
                                    {book.title?.trim().charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="bg-[#F6F1E7] px-8 py-10 md:px-12 md:py-12 flex flex-col justify-between">
                    <div>
                        <span className="inline-block text-xs tracking-wide text-[#BB5C2C] border border-[#BB5C2C]/40 rounded-full px-3 py-1">
                            {book.category}
                        </span>

                        <h1
                            className="mt-5 text-4xl md:text-5xl leading-[1.05] text-[#241C14]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                        >
                            {book.title}
                        </h1>
                        <p
                            className="mt-2 text-base text-[#5A4E3E]"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            {book.author}
                        </p>

                        <p className="mt-6 text-[15px] leading-relaxed text-[#3B3226] max-w-[46ch]">
                            {book.description}
                        </p>
                    </div>

                    <div className="mt-10">
                        {/* availability trail */}
                        <div className="flex items-center justify-between text-sm text-[#5A4E3E] mb-2">
                            <span>Copies on the shelf</span>
                            <span>
                                {book.available_copies} of {book.total_copies}
                            </span>
                        </div>
                        <div className="h-[3px] w-full bg-[#E4CFA5] relative">
                            <div
                                className="h-[3px] bg-[#BB5C2C] absolute left-0 top-0"
                                style={{ width: `${availabilityPct}%` }}
                            />
                            <div
                                className="w-2 h-2 rounded-full bg-[#241C14] absolute -top-[3px]"
                                style={{ left: `calc(${availabilityPct}% - 4px)` }}
                            />
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#5A4E3E]">Price</p>
                                <p
                                    className="text-2xl"
                                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                                >
                                    {(book.price / 100).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                            <button onClick={handleREserve} className="px-6 py-3 bg-[#241C14] text-[#F6F1E7] text-sm hover:bg-[#3B3226] transition-colors">
                                Reserve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksDetails;
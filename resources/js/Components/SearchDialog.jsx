import React, { useState, useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import debounce from 'lodash.debounce';
import axios from "axios";
import { getImage } from "@/Helpers/Helpers";
import { Link } from "@inertiajs/react";

export default function SearchDialog({ isOpen, setIsOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                if (searchTerm.length > 0) {
                    const response = await axios.get(`/search/${searchTerm}`);
                    setResults(response.data);
                }
            } catch (error) {
                console.error(error);
            }

        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <>
            <div className={` ${isOpen ? "opacity-100 z-50" : "opacity-0 -z-20"} fixed duration-100 transition-opacity  w-full h-full top-0 flex justify-center items-center bg-black/50  backdrop-blur-sm`}>
                <div className="relative bg-white rounded-lg shadow  w-1/2">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <div className="flex items-center w-full ">
                            <span className=" text-sidebarbg text-2xl mr-5"><LuSearch /></span>
                            <input type="text" placeholder="Search" className="w-full bg-transparent border-none font-poppins focus:outline-none focus:ring-0 text-lg p-2" value={searchTerm} onChange={handleChange} />
                        </div>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="static-modal" onClick={() => setIsOpen(false)}>
                            <LuX />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {
                            results.length > 0 ?
                                results.map((result, index) => (
                                    <div className="flex h-20 w-full" key={index}>
                                        <img src={result.thumbnail} alt="" className="w-1/4 object-cover mr-4" />
                                        <div className="flex flex-col w-3/4 text-ellipsis line-clamp-2">
                                            <Link href={'/post/' + result.slug} className="hover:underline font-poppins h-full w-full">{result.title}</Link>

                                        </div>
                                    </div>
                                ))
                                :
                                <p>No results found</p>
                        }


                    </div>
                </div>
            </div>
        </>
    )

}
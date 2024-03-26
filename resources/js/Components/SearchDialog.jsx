import React, { useState, useEffect } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import debounce from 'lodash.debounce';
import axios from "axios";
import getImage from "@/Helpers/Helpers";
import { Link } from "@inertiajs/react";

export default function SearchDialog({ isOpen, setIsOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            setLoading(true);
            try {
                if (searchTerm.length > 0) {
                    const response = await axios.get(`/search/${searchTerm}`);
                    setResults(response.data);
                } else {
                    setResults([]);
                    setIsSearching(false);
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <>
            <div className={` ${isOpen ? "opacity-100 z-50" : "opacity-0 -z-20"} fixed duration-100 transition-opacity  w-full h-full top-0  flex justify-center items-center bg-black/50  backdrop-blur-sm`}>
                <div className="relative bg-white dark:bg-darkBg rounded-lg shadow w-3/4 md:w-2/3  lg:w-1/2">
                    <div className="flex items-center justify-between  md:px-4 md:py-2 border-b dark:border-darkContainer rounded-t ">
                        <div className="flex items-center w-full ">
                            <span className=" text-sidebarbg ml-2 md:mr-0 dark:text-textDark text-lg lg:text-2xl mr-5"><LuSearch /></span>
                            <input type="text" placeholder="Search" className="w-full bg-transparent border-none font-poppins focus:outline-none focus:ring-0 text-base lg:text-lg p-2 dark:text-textDark" value={searchTerm} onChange={handleChange} />
                        </div>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="static-modal" onClick={() => setIsOpen(false)}>
                            <LuX />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {
                            loading ? <p className="text-textDark">Loading...</p> : results.length > 0 ?
                                results.map((result, index) => (
                                    <div className="flex h-20 w-full" key={index}>
                                        <img src={getImage(result.thumbnail)} alt="" className="w-1/4 object-cover mr-4" />
                                        <div className="flex flex-col w-3/4 text-ellipsis line-clamp-2">
                                            <Link href={'/post/' + result.slug} className="hover:underline text-sm md:text-base font-poppins h-full w-full dark:text-textDark" onClick={() => setIsOpen(false)}>{result.title}</Link>

                                        </div>
                                    </div>
                                ))
                                :
                                <p className="text-textDark">{isSearching ? 'Not Found' : ''}</p>
                        }


                    </div>
                </div>
            </div>
        </>
    )

}
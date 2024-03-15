import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import Footer from '@/Components/Footer';
import { LuChevronUp } from "react-icons/lu";

export default function Authenticated({ user, header, children }) {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const checkScroll = () => {
            setIsScrolled(window.pageYOffset > 0);
        };

        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);
    return (
        <>
            <Head title={header} />
            <Navbar />
            <div className="xl:px-64 md:px-20 px-5 bg-gray-50 mx-auto mt-32">

                <main>{children}</main>
            </div>
            <button className={`fixed bottom-10 right-10 z-20 bg-white rounded-full shadow-2xl flex items-center justify-center w-16 h-16 font-bold  text-sidebarbg transition-opacity duration-100
            ${isScrolled ? 'opacity-100' : 'opacity-0'} `} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <LuChevronUp size={30} />
            </button>

            <Footer />
        </>
    );
}

import { Link } from "@inertiajs/react";
import Logo from "@/Assets/Icons/Logo";
import { LuAlignJustify, LuSearch } from "react-icons/lu";
import NavbarPhone from "./NavbarPhone";
import { useState, useEffect } from "react";
import SearchDialog from "./SearchDialog";
import { usePage } from "@inertiajs/react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { url } = usePage()
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const visible = prevScrollPos > currentScrollPos;

            setPrevScrollPos(currentScrollPos);
            setIsVisible(visible);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);
    return (
        <>
            <NavbarPhone isOpen={isMenuOpen} toggle={toggleMenu} />
            <nav className={`w-full shadow-md shadow-purple/50 h-20 items-center fixed z-20 bg-purple flex justify-between duration-200 transition-all  px-5 xl:px-64 text-white mb-10 ${isVisible ? 'top-0 opacity-100' : '-top-24 opacity-0'}`}>
                <Link href={route('home')} className="fill-white"><Logo /></Link>
                <div className="hidden  w-full md:flex justify-end">
                    <div className='flex w-1/3 gap-20 justify-end'>
                        <Link className={`hover:underline block font-semibold font-opensans ${url.startsWith('/home') ? 'underline' : ''}`} href={route('home')}> Home </Link>
                        <Link className={`hover:underline block font-semibold font-opensans ${url.startsWith('/about') ? 'underline' : ''}`} href={route('about')}> About </Link>
                        <button className="text-xl font-bold" onClick={() => setIsSearchOpen(true)}><LuSearch /></button>
                    </div>
                </div>
                <button className=" md:hidden" onClick={toggleMenu}>
                    <LuAlignJustify />
                </button>
            </nav>
            <SearchDialog isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        </>
    )
}

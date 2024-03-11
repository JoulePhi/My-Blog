import { Link } from "@inertiajs/react";
import Logo from "@/Assets/Icons/Logo";
import { LuAlignJustify } from "react-icons/lu";
import NavbarPhone from "./NavbarPhone";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

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
            <nav className={`w-full h-20 items-center fixed z-20 bg-purple flex justify-between duration-200 transition-all  px-5 xl:px-64 text-white mb-10 ${isVisible ? 'top-0 opacity-100' : '-top-24 opacity-0'}`}>
                {/* <h1 className='font-bold  tracking-widest'>Dzulfikar Sadid</h1> */}
                <span className="fill-white"><Logo /></span>
                <div className="hidden  w-full md:flex justify-end">
                    <div className='flex w-1/6 justify-between'>
                        <Link className="hover:underline block" href={route('home')}> Home </Link>
                        <Link className="hover:underline block" href="#"> Project </Link>
                        <Link className="hover:underline block" href="#"> About </Link>
                    </div>
                </div>
                <button className=" md:hidden" onClick={toggleMenu}>
                    <LuAlignJustify />
                </button>
            </nav>
        </>
    )
}

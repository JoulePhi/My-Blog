import { Link } from "@inertiajs/react";
import Logo from "@/Assets/Icons/Logo";
import { LuAlignJustify } from "react-icons/lu";
import NavbarPhone from "./NavbarPhone";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            // Disable scrolling when the menu is open
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling when the menu is closed
            document.body.style.overflow = 'unset';
        }
    }
    return (
        <>
            <NavbarPhone isOpen={isMenuOpen} toggle={toggleMenu} />
            <nav className='w-full h-20 items-center bg-purple  flex  justify-between  top-0 px-5 xl:px-64 text-white mb-10  '>
                {/* <h1 className='font-bold  tracking-widest'>Dzulfikar Sadid</h1> */}
                <span className="fill-white"><Logo /></span>
                <div className="hidden  w-full md:flex justify-end">
                    <div className='flex w-1/4 justify-evenly'>
                        <Link className="hover:underline block" href="#"> Blog </Link>
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

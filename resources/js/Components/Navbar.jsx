import { Link } from "@inertiajs/react";
import Logo from "@/Assets/Icons/Logo";
import { LuAlignJustify, LuSearch } from "react-icons/lu";
import NavbarPhone from "./NavbarPhone";
import { useState, useEffect } from "react";
import SearchDialog from "./SearchDialog";
import { usePage } from "@inertiajs/react";
import { useLocalStorage } from "usehooks-ts";
import { LuSunMedium, LuMoon } from "react-icons/lu";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { url } = usePage()
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    useEffect(() => {
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(theme)
    }, [theme])

    const [enabled, setEnabled] = useState(theme == 'light')

    const handleThemeChange = (enabled) => {
        setTheme(enabled ? 'light' : 'dark')
        setEnabled(enabled)
    }
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
            <NavbarPhone isOpen={isMenuOpen} toggle={toggleMenu} setIsSearchOpen={setIsSearchOpen} theme={theme} handleThemeChange={handleThemeChange} />
            <nav className={`w-full shadow-md shadow-purple/50 h-20 items-center fixed z-20 bg-purple dark:bg-darkBg dark:shadow-none  border-transparent dark:border-darkContainer border-b flex justify-between duration-200 transition-all  px-5 xl:px-64 text-white mb-10 ${isVisible ? 'top-0 opacity-100' : '-top-24 opacity-0'}`}>
                <Link href={route('home')} className="fill-white dark:fill-textDark"><Logo /></Link>
                <div className="hidden  w-full md:flex justify-end">
                    <div className='flex w-1/3 gap-20 justify-end'>
                        <Link className={`hover:underline block font-base font-opensans ${url.startsWith('/home') ? 'font-bold' : ''}`} href={route('home')} preserveScroll> Home </Link>
                        <Link className={`hover:underline block font-base font-opensans ${url.startsWith('/about') ? 'font-bold' : ''}`} href={route('about')} preserveScroll> About </Link>
                        <button className="text-xl font-bold " onClick={() => setIsSearchOpen(true)}><LuSearch /></button>
                        {theme === 'light' ? (
                            <button onClick={() => handleThemeChange(false)}><LuMoon /></button>
                        ) : (
                            <button onClick={() => handleThemeChange(true)} ><LuSunMedium /></button>

                        )}
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

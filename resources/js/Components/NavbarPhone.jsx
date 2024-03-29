import { LuX, LuSearch, LuSunMedium, LuMoon } from "react-icons/lu";
import Logo from "@/Assets/Icons/Logo";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

export default function NavbarPhone({ isOpen, toggle, setIsSearchOpen, theme, handleThemeChange }) {

    const changePage = () => {
        toggle();
        document.body.style.overflow = 'unset';
    }

    const openSerach = () => {
        setIsSearchOpen(true);
        toggle();
    }
    const { url } = usePage()
    return (
        <nav className={`${isOpen ? ' opacity-100 z-40' : 'opacity-0 -z-10'}  transition-opacity w-full h-dvh bg-white dark:bg-darkBg fixed top-0 bottom-0 duration-300`}>
            <div className="flex flex-col h-full">
                <button className="text-3xl self-end m-4 dark:text-textDark" onClick={toggle}><LuX /></button>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-10">
                        <span className="fill-purple "><Logo /></span>
                        <button className="text-xl font-bold dark:text-textDark " onClick={openSerach}><LuSearch /></button>
                        <Link className={`hover:underline block  dark:text-textDark font-semibold font-opensans ${url.startsWith('/home') ? 'underline' : ''}`} href={route('home')} onClick={changePage}>Home</Link>
                        <Link className={`hover:underline block  dark:text-textDark font-semibold font-opensans ${url.startsWith('/about') ? 'underline' : ''}`} href={route('about')} onClick={changePage}>About</Link>
                        {theme === 'light' ? (
                            <button onClick={() => handleThemeChange(false)}><LuMoon /></button>
                        ) : (
                            <button className="text-xl font-bold dark:text-textDark" onClick={() => handleThemeChange(true)}><LuSunMedium /></button>

                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
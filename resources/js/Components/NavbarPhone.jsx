import { LuX } from "react-icons/lu";
import Logo from "@/Assets/Icons/Logo";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";


export default function NavbarPhone({ isOpen, toggle }) {

    const changePage = () => {
        toggle();
        document.body.style.overflow = 'unset';
    }
    const { url } = usePage()
    return (
        <nav className={`${isOpen ? ' opacity-100 z-50' : 'opacity-0 -z-10'}  transition-opacity w-full h-dvh bg-white fixed top-0 bottom-0 duration-300`}>
            <div className="flex flex-col h-full">
                <button className="text-3xl self-end m-4" onClick={toggle}><LuX /></button>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center justify-center">
                        <span className="fill-purple my-5"><Logo /></span>
                        <Link className={`hover:underline block my-5 font-semibold font-opensans ${url.startsWith('/home') ? 'underline' : ''}`} href={route('home')} onClick={changePage}>Home</Link>
                        <Link className={`hover:underline block my-5 font-semibold font-opensans ${url.startsWith('/about') ? 'underline' : ''}`} href={route('about')} onClick={changePage}>About</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
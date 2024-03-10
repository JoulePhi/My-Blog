import { LuX } from "react-icons/lu";
import Logo from "@/Assets/Icons/Logo";



export default function NavbarPhone({ isOpen, toggle }) {
    return (
        <nav className={`${isOpen ? ' opacity-100 z-20' : 'opacity-0 -z-10'} absolute transition-opacity w-full h-dvh bg-white  top-0 bottom-0 duration-300`}>
            <div className="flex flex-col h-full">
                <button className="text-3xl self-end m-4" onClick={toggle}><LuX /></button>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center justify-center">
                        <span className="fill-purple my-5"><Logo /></span>
                        <span className="hover:underline block my-5">Blog</span>
                        <span className="hover:underline block my-5">Project</span>
                        <span className="hover:underline block my-5">About</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
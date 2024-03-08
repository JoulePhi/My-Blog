import { Link } from "@inertiajs/react";
import Logo from "@/Assets/Icons/Logo";
import { LuAlignJustify } from "react-icons/lu";

export default function Navbar() {
    return (
        <nav className='w-full h-20 items-center bg-purple  flex  justify-between  top-0 px-5 xl:px-64 text-white mb-10 z-10 '>
            {/* <h1 className='font-bold  tracking-widest'>Dzulfikar Sadid</h1> */}
            <span className="fill-white"><Logo /></span>
            <div className="hidden  w-full md:flex justify-end">
                <div className='flex w-1/4 justify-evenly'>
                    <Link> <span className="hover:underline block">Blog</span> </Link>
                    <Link> <span className="hover:underline block" >Project</span> </Link>
                    <Link> <span className="hover:underline block">About</span> </Link>
                </div>
            </div>
            <div className=" md:hidden">
                <LuAlignJustify />
            </div>
        </nav>
    )
}

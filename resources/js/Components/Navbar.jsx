import {Link} from "@inertiajs/react";


export default function Navbar(){
    return (
        <nav className='w-full h-32 border-b-2 flex pt-10 justify-between'>
            <h1 className='font-bold  tracking-widest'>Dzulfikar Sadid</h1>
            <div className='flex w-1/4 justify-evenly'>
                <Link> <span>Blog</span> </Link>
                <Link> <span>Project</span> </Link>
                <Link> <span>About</span> </Link>

            </div>
        </nav>
    )
}

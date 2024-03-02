import Search from "@/Assets/Icons/Search";


export default function Navbar() {
    return (
        <>
            <nav className='bg-white w-full h-24 shadow-md px-20 py-8 flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-black'>Hello, Admin 🖐</h1>
                <div className='flex items-center'>
                    <div className="relative w-full ">
                        <input type="text" id="simple-search"
                               className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                               placeholder="Search..." />
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                            <Search/>
                        </div>
                    </div>
                    <div className='w-[50px] h-[40px]  bg-gray-500 rounded-full ml-10'>

                    </div>
                </div>
            </nav>
        </>
    )
}

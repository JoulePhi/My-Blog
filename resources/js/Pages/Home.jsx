import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getImage } from "@/Helpers/Helpers.jsx";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";



const Home = () => {
    return (
        <div>
            <h1 className='font-bold mb-8 text-xl'>Recent Blog Posts</h1>



            <div className="sm:flex justify-center w-full">
                <div className='grid grid-cols-2 grid-rows-2 gap-4 h-80 md:h-[25rem] xl:h-[30rem]  w-full place-content-center aspect-video'>


                    <div className="bg-white col-start-1 col-end-3 lg:row-start-1 lg:row-end-3 lg:col-end-2 relative overflow-hidden ">
                        <img src={getImage('images/blog1.png')} className=' object-cover rounded-lg w-full h-full' alt="" />
                        <div className=" col-start-1 row-start-2 absolute inset-0 opacity-0 hover:opacity-100 duration-300 bg-black/70 rounded-lg">
                            <div className="flex items-center justify-center h-full">
                                <button className="px-6 py-4 text-white font-poppins font-bold border hover:underline">Read More</button>
                            </div>
                        </div>
                    </div>

                    <div className='flex h-full  bg-white shadow-xl rounded-xl overflow-hidden'>
                        <img src={getImage('images/blog2.png')} className='lg:w-1/2 w-full aspect-video object-cover '
                            alt="" />
                        <div className='lg:flex flex-col  justify-between flex-grow p-4 hidden'>
                            <span className="font-semibold text-purple">Olivia Rhye • 1 Jan 2023</span>
                            <span className="font-semibold text-2xl text-sidebarbg">UX review presentations</span>
                            <p className="text-grey line-clamp-3">How do you create compelling presentations that wow your
                                colleagues and
                                impress your
                                managers?</p>
                            <div className='flex gap-4'>
                                <span className='text-purple bg-purple/5 font-medium px-4 py-1 rounded-full'>Design</span>
                                <span className='text-blue bg-blue/5 font-medium px-4 py-1 rounded-full'>Research</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex h-full  bg-white shadow-xl rounded-xl overflow-hidden'>
                        <img src={getImage('images/blog2.png')} className='lg:w-1/2 w-full aspect-video object-cover '
                            alt="" />
                        <div className='lg:flex flex-col  justify-between flex-grow p-4 hidden'>
                            <span className="font-semibold text-purple">Olivia Rhye • 1 Jan 2023</span>
                            <span className="font-semibold text-2xl text-sidebarbg">UX review presentations</span>
                            <p className="text-grey line-clamp-3">How do you create compelling presentations that wow your
                                colleagues and
                                impress your
                                managers?</p>
                            <div className='flex gap-4'>
                                <span className='text-purple bg-purple/5 font-medium px-4 py-1 rounded-full'>Design</span>
                                <span className='text-blue bg-blue/5 font-medium px-4 py-1 rounded-full'>Research</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <h1 className='font-bold mb-8 text-xl my-10'>All Blog Posts</h1>


            <div className='flex flex-col items-center justify-center md:grid md:grid-cols-3 xl:grid-cols-4 gap-6 h-[full] grid-rows-2 mb-10'>
                {
                    Array(8).fill().map((_, i) => (
                        <div className=' flex flex-col bg-white shadow-lg rounded-xl h-[28rem]  overflow-hidden' key={i}>
                            <img src={getImage('images/blog1.png')} className=' object-cover  w-full h-1/2'
                                alt="" />
                            <div className='flex flex-col  justify-between  p-4 flex-grow '>
                                <span className="font-semibold text-purple">Olivia Rhye • 1 Jan 2023</span>
                                <span className="font-semibold text-xl text-sidebarbg">UX review presentations</span>
                                <p className="text-grey line-clamp-2">How do you create compelling presentations that
                                    wow your colleagues and
                                    impress your
                                    managers?</p>
                                <div className='w-full overflow-hidden'>
                                    <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                                        <span
                                            className='text-purple bg-purple/5 font-medium px-4 py-1 rounded-full text-xs'>Design</span>
                                        <span
                                            className='text-blue bg-blue/5 font-medium px-4 py-1 rounded-full text-xs'>Research</span>
                                        <span
                                            className='text-magenta bg-magenta/5 font-medium px-4 py-1 rounded-full text-xs'>Presentation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>


            <div className="flex justify-between">
                <button className="flex items-center text-grey">
                    <LuArrowLeft />
                    <span className='text-grey text-sm ml-6'>Previous</span>
                </button>

                <div className='md:flex hidden'>
                    <button className="w-10 h-10 text-purple font-semibold bg-purple/5 rounded-lg">1</button>
                    <button className="w-10 h-10    text-grey">2</button>
                    <button className="w-10 h-10    text-grey">3</button>
                    <button className="w-10 h-10    text-grey">...</button>
                    <button className="w-10 h-10    text-grey">8</button>
                    <button className="w-10 h-10    text-grey">9</button>
                    <button className="w-10 h-10    text-grey">10</button>
                </div>
                <button className="flex items-center text-grey">
                    <span className='text-grey text-sm mr-6'>Next</span>
                    <LuArrowRight />
                </button>
            </div>

        </div>
    );
}


Home.layout = page => <Authenticated children={page} header="Home" />

export default Home;

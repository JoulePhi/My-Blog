import Authenticated from "@/Layouts/AuthenticatedLayout";
import { motion } from 'framer-motion';
import { Link } from "@inertiajs/react";
import { LuChevronsRight } from "react-icons/lu";
import PostCard from "@/Components/PostCard";




const Home = ({ recentPosts, allPosts }) => {


    return (
        <div>
            {
                recentPosts.length > 0 && (
                    <>
                        <h1 className='font-bold mb-8 text-xl dark:text-textDark'>Recent Blog</h1>



                        <div className="sm:flex justify-center w-full">
                            <div className=' flex flex-col  md:grid md:grid-cols-2  md:grid-rows-2 gap-6   md:h-[30rem]  w-full place-content-center aspect-video'>


                                <div className="bg-white dark:bg-darkContainer h-[28rem] md:h-full md:col-span-2 flex flex-col shadow-lg rounded-xl lg:row-start-1 lg:row-end-3 lg:col-end-2 relative overflow-hidden">
                                    <Link className="h-1/2 md:h-full" href={'/post/' + recentPosts[0].slug}><img src={recentPosts[0].thumbnail} className='object-cover md:rounded-lg w-full h-full ' alt="" /></Link>
                                    <div className="hidden lg:block col-start-1 row-start-2 absolute inset-0 opacity-0 hover:opacity-100 duration-300 bg-gradient-to-t from-black/70 rounded-lg">
                                        <div className="flex flex-col px-6 py-10 justify-end h-full">
                                            <span className="font-semibold text-white">Dzulfikar Sadid • {new Date(recentPosts[0].published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <Link href={'/post/' + recentPosts[0].slug}><span className="font-semibold text-lg md:text-4xl text-white mt-4 hover:underline">{recentPosts[0].title}</span></Link>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between p-4 flex-grow md:hidden'>
                                        <span className="font-semibold text-purple text-sm">Dzulfikar Sadid • {new Date(recentPosts[0].published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        <Link href={'/post/' + recentPosts[0].slug}><span className="font-semibold xl:text-2xl text-xl text-sidebarbg dark:text-textDark text-ellipsis line-clamp-2 hover:underline ">{recentPosts[0].title}</span></Link>
                                        <p className="text-grey line-clamp-2 text-base md:text-lg">{recentPosts[0].short_content}</p>
                                        <div className='w-full overflow-hidden'>
                                            <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                                                {
                                                    recentPosts[0].tags.slice(0, 3).map((tag, i) => (
                                                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs md:text-sm line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                                                    ))
                                                }
                                                {
                                                    recentPosts[0].tags.length > 3 && <span className="text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs">+ {recentPosts[0].tags.length - 3} </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='flex flex-col lg:flex-row md:h-full h-[28rem]  bg-white dark:bg-darkContainer shadow-xl rounded-xl overflow-hidden '>
                                    <Link className="h-1/2 md:h-full lg:w-1/2 bg-red-100" href={'/post/' + recentPosts[1].slug}><img src={recentPosts[1].thumbnail} className='object-cover   w-full h-full ' alt="" /></Link>
                                    <div className='lg:flex  flex flex-col justify-between lg:w-2/3 h-full p-4 md:hidden'>
                                        <span className="font-semibold text-purple text-sm  ">Dzulfikar Sadid • {new Date(recentPosts[1].published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        <Link href={'/post/' + recentPosts[1].slug}><span className="font-semibold xl:text-2xl text-xl text-sidebarbg text-ellipsis line-clamp-2 hover:underline dark:text-textDark">{recentPosts[1].title}</span></Link>
                                        <p className="text-grey line-clamp-2 text-sm lg:line-clamp-2">{recentPosts[1].short_content}</p>
                                        <div className='w-full overflow-hidden'>
                                            <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                                                {
                                                    recentPosts[1].tags.slice(0, 3).map((tag, i) => (
                                                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                                                    ))
                                                }
                                                {
                                                    recentPosts[1].tags.length > 3 && <span className="text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs">+ {recentPosts[1].tags.length - 3} </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row md:h-full h-[28rem]  bg-white dark:bg-darkContainer shadow-xl rounded-xl overflow-hidden '>
                                    <Link className="h-1/2 md:h-full lg:w-1/2 bg-red-100" href={'/post/' + recentPosts[2].slug}><img src={recentPosts[2].thumbnail} className='object-cover  w-full h-full ' alt="" /></Link>
                                    <div className='lg:flex  flex flex-col justify-between lg:w-2/3 h-full p-4 md:hidden'>
                                        <span className="font-semibold text-purple text-sm  ">Dzulfikar Sadid • {new Date(recentPosts[2].published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        <Link href={'/post/' + recentPosts[2].slug}><span className="font-semibold xl:text-2xl text-xl text-sidebarbg text-ellipsis line-clamp-2 hover:underline dark:text-textDark">{recentPosts[2].title}</span></Link>
                                        <p className="text-grey line-clamp-2 text-sm lg:line-clamp-2">{recentPosts[2].short_content}</p>
                                        <div className='w-full overflow-hidden'>
                                            <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                                                {
                                                    recentPosts[2].tags.slice(0, 3).map((tag, i) => (
                                                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                                                    ))
                                                }
                                                {
                                                    recentPosts[2].tags.length > 3 && <span className="text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs">+ {recentPosts[2].tags.length - 3} </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </>
                )
            }






            {
                Object.entries(allPosts).map(([category, posts]) => (
                    <div key={category} >
                        <span className="w-full flex justify-between items-center">
                            <h1 className='font-bold mb-8 text-xl my-10 uppercase dark:text-textDark'>{category}</h1>
                            <Link className="hover:underline flex items-center text-lg justify-between dark:text-textDark" href={"/category/" + category}>See All  <LuChevronsRight />  </Link>
                        </span>
                        <div className='flex flex-col items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 h-[full]  mb-10' >
                            {posts.map((post, i) => (
                                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.05 }} key={i}>
                                    <PostCard post={post} />
                                </motion.div>

                            ))}
                        </div>
                    </div>
                ))
            }





        </div>
    );
}


Home.layout = page => <Authenticated children={page} header="Home" />

export default Home;

import { Link } from "@inertiajs/react";




export default function PostCard({ post }) {

    return (
        <>
            <div className=' flex flex-col bg-white shadow-lg rounded-xl h-[28rem]  overflow-hidden' >
                <img src={post.thumbnail} className=' object-cover  w-full h-1/2'
                    alt="" />
                <div className='flex flex-col  justify-between  p-4 flex-grow '>
                    <span className="font-semibold text-purple">Olivia Rhye • {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="font-semibold text-xl text-sidebarbg line-clamp-2">{post.title}</span>
                    <p className="text-grey line-clamp-2">How do you create compelling presentations that
                        wow your colleagues and
                        impress your
                        managers?</p>
                    <div className='w-full overflow-hidden'>
                        <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                            {
                                post.tags.map((tag, i) => (
                                    <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 font-medium px-4 py-1 rounded-full text-xs line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
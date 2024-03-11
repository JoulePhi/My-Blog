import { Link } from "@inertiajs/react";




export default function PostCard({ post }) {

    return (
        <>
            <div className=' flex flex-col bg-white shadow-lg rounded-xl h-[28rem]  overflow-hidden' >
                <Link className="w-full h-1/2" href={'/post/' + post.slug}><img src={post.thumbnail} className=' object-cover  w-full h-full'
                    alt="" /></Link>
                <div className='flex flex-col  justify-between  p-4 flex-grow '>
                    <span className="font-semibold text-purple">Dzulfikar Sadid • {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <Link href={'/post/' + post.slug} className="font-semibold text-xl text-sidebarbg line-clamp-2 hover:underline">{post.title}</Link>
                    <p className="text-grey line-clamp-2 text-sm">{post.content}</p>
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
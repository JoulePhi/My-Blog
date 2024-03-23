import { Link } from "@inertiajs/react";

export default function PostCard({ post }) {

    return (
        <>
            <div className=' flex flex-col bg-white dark:bg-darkContainer  shadow-lg rounded-xl h-[28rem]  overflow-hidden duration-200 transition-all' >
                <Link className="w-full h-1/2" href={'/post/' + post.slug}><img src={post.thumbnail} className=' object-cover  w-full h-full'
                    alt="" /></Link>
                <div className='flex flex-col  justify-between  p-4 flex-grow '>
                    <span className="font-semibold text-purple text-sm">Dzulfikar Sadid • {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <Link href={'/post/' + post.slug} className="font-semibold text-xl lg:text-2xl text-sidebarbg line-clamp-2 hover:underline dark:text-textDark">{post.title}</Link>
                    <p className="text-grey line-clamp-2 text-sm">{post.content}</p>
                    <div className='w-full overflow-hidden'>
                        <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                            {
                                post.tags.slice(0, 3).map((tag, i) => (
                                    <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                                ))
                            }
                            {
                                post.tags.length > 3 && <span className="text-purple bg-purple/5 dark:bg-darkBg/30 font-medium px-4 py-1 rounded-full text-xs">+ {post.tags.length - 3} </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
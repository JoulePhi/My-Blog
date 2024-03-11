import Authenticated from "@/Layouts/AuthenticatedLayout"
import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import PostCard from "@/Components/PostCard";
import Comment from "@/Components/Comment";
const DetailPost = ({ post, relatedPosts }) => {




    return (
        <>
            <h2 className="font-semibold text-purple text-xl mb-5">{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h2>
            <h1 className="font-semibold text-sidebarbg text-6xl text-wrap mb-10">{post.title}</h1>
            <img src={post.thumbnail} className="w-full aspect-video rounded-xl" alt="" />
            <div className="text-grey text-lg my-10">
                {post.content}
            </div>
            <div className='flex gap-4 o w-full flex-wrap items-center mb-10'>
                {
                    post.categories.map((tag, i) => (
                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 font-medium px-4 py-1 rounded-full line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                    ))
                }
                <span className=" text-xl text-grey">/</span>
                {
                    post.tags.map((tag, i) => (
                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5 font-medium px-4 py-1 rounded-full line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                    ))
                }
            </div>

            {
                relatedPosts.length > 0 ? (
                    <>
                        <h1 className="font-semibold text-sidebarbg text-3xl text-wrap mb-10">Related Posts</h1>

                        <div className="w-full grid grid-cols-4 gap-6">
                            {
                                relatedPosts.map((post, i) => (
                                    <PostCard key={i} post={post} />
                                ))
                            }
                        </div>
                    </>
                ) : ''


            }

            <Comment />
        </>
    )
}



DetailPost.layout = page => <Authenticated children={page} header="Detail" />

export default DetailPost;
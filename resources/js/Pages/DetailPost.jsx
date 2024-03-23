import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/react";
import PostCard from "@/Components/PostCard";
import Safe from 'react-safe';

const DetailPost = ({ post, relatedPosts }) => {



    return (
        <>
            <h2 className="font-semibold text-purple  lg:text-xl mb-5">{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h2>
            <h1 className="font-semibold text-sidebarbg text-3xl lg:text-6xl text-wrap mb-10 dark:text-textDark">{post.title}</h1>
            <img src={post.thumbnail} className="w-full aspect-video rounded-xl" alt="" />
            <div className="text-grey text-lg my-10 dark:text-textDark">
                {post.content}
            </div>
            <div className='flex gap-4 o w-full flex-wrap items-center mb-10'>
                {
                    post.categories.map((tag, i) => (
                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5  dark:bg-darkBg/30 font-xs lg:font-medium px-4 py-1 rounded-full line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                    ))
                }
                <span className=" text-xl text-grey">/</span>
                {
                    post.tags.map((tag, i) => (
                        <Link href={"/tag/" + tag.title} key={i} className={`text-purple bg-purple/5  dark:bg-darkBg/30 font-xs lg:font-medium px-4 py-1 rounded-full line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{tag.title}</Link>
                    ))
                }
            </div>

            {
                relatedPosts.length > 0 ? (
                    <>
                        <h1 className="font-semibold text-sidebarbg text-3xl text-wrap mb-10 dark:text-textDark">Related Posts</h1>

                        <div className="w-full flex flex-col lg:grid lg:grid-cols-4 gap-6">
                            {
                                relatedPosts.map((post, i) => (
                                    <PostCard key={i} post={post} />
                                ))
                            }
                        </div>
                    </>
                ) : ''


            }

            <div id="disqus_thread" className="my-14"></div>
            <Safe.script>
                {
                    (function () { // DON'T EDIT BELOW THIS LINE
                        var d = document, s = d.createElement('script');
                        s.src = 'https://codewithjoule.disqus.com/embed.js';
                        s.setAttribute('data-timestamp', +new Date());
                        (d.head || d.body).appendChild(s);
                    })()


                }

            </Safe.script>
        </>
    )
}



DetailPost.layout = page => <Authenticated children={page} header="Detail" />

export default DetailPost;
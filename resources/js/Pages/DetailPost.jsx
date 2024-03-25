import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, Link } from "@inertiajs/react";
import PostCard from "@/Components/PostCard";
import Safe from 'react-safe';
import { dracula, CopyBlock } from 'react-code-blocks';
import parse from 'html-react-parser';
import { WhatsappShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, FacebookIcon, FacebookShareButton } from "react-share";
import { getImage } from "@/Helpers/Helpers";

const DetailPost = ({ post, relatedPosts }) => {

    const transform = (node) => {
        if (node.type === 'tag' && node.name === 'pre') {
            console.log(node.children[0].data.split('\\'))
            return <CopyBlock
                text={node.children[0].data.split('\\')[2].trim()}
                language={node.children[0].data.split('\\')[0]}
                showLineNumbers={true}
                theme={dracula}
                codeBlock
            />;
        }
    };

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.short_content} />

            </Head>
            <h2 className="font-semibold text-purple  lg:text-xl mb-5">{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</h2>
            <h1 className="font-semibold text-sidebarbg text-3xl lg:text-6xl text-wrap mb-10 dark:text-textDark">{post.title}</h1>
            <img src={getImage(post.thumbnail)} className="w-full aspect-video rounded-xl" alt="" />
            <div className="flex my-5 w-full justify-end gap-4">
                <TwitterShareButton url={window.location.href} hashtags={post.tags.map((e) => e.title)} title={post.title} ><TwitterIcon size={32} round={true} /></TwitterShareButton>
                <WhatsappShareButton url={window.location.href} title={post.title}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                <FacebookShareButton url={window.location.href}><FacebookIcon size={32} round={true} /></FacebookShareButton>
            </div>

            <div className="text-grey text-lg my-10 dark:text-textDark">
                {parse(post.content, { replace: transform })}
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
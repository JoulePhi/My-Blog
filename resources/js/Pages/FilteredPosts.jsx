import { getImage } from "@/Helpers/Helpers";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useEffect } from "react";
import PostCard from "@/Components/PostCard";
import { Link } from "@inertiajs/react";

const FilteredPosts = ({ posts, title }) => {

    useEffect(() => {
        console.log(posts);
    }, [])

    return (
        <>
            <h1 className='font-bold mb-8 text-2xl'>{title}</h1>

            <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-3 xl:grid-cols-4">
                {
                    posts.data.map((post, i) => (
                        <PostCard post={post} key={i} />
                    ))
                }
            </div>
            <div className="flex justify-between mt-10">
                <Link className="flex items-center text-grey" href={posts.prev_page_url}>
                    <LuArrowLeft />
                    <span className='text-grey text-sm ml-6'>Previous</span>
                </Link>

                <div className='md:flex hidden'>

                    {
                        posts.links.slice(1, posts.links.length - 1).map((link, i) => (
                            <Link key={i} href={link.url} className={`w-10 h-10 text-grey flex items-center justify-center ${link.active ? 'text-purple font-semibold bg-purple/5 rounded-lg ' : ''}`}>{link.label}</Link>
                        ))
                    }
                </div>
                <Link className="flex items-center text-grey" href={posts.next_page_url}>
                    <span className='text-grey text-sm mr-6'>Next</span>
                    <LuArrowRight />
                </Link>
            </div>
        </>
    );
}


FilteredPosts.layout = page => <Authenticated children={page} header="Posts" />

export default FilteredPosts;
import Menu from "@/Components/Dashboard/Menu.jsx";
import Home from "@/Assets/Icons/Home.jsx";
import Blog from "@/Assets/Icons/Blog.jsx";
import Tag from "@/Assets/Icons/Tag.jsx";
import Category from "@/Assets/Icons/Category.jsx";
import {Link} from "@inertiajs/react";

export default function Sidebar(){
    return (
        <>
            <nav className='w-72 bg-sidebarbg'>
                <Link href={route('posts.index')} className="text-white mx-auto text-4xl my-10 font-bold text-center tracking-widest">Admin</Link>
                <Menu title="Dashboard" route={route('admin.dashboard')}
                      active={route().current('admin.dashboard')}><Home/></Menu>
                <Menu title="Blog" route={route('admin.posts.index')} active={route().current('admin.posts.index')}><Blog/></Menu>
                <Menu title="Tags" route={route('admin.tags.index')} active={route().current('admin.tags.index')}><Tag/></Menu>
                <Menu title="Categories" route={route('admin.categories.index')} active={route().current('admin.categories.index')}><Category/></Menu>
            </nav>
        </>
    )
}

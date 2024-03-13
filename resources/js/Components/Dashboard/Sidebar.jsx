import Menu from "@/Components/Dashboard/Menu.jsx";
import Home from "@/Assets/Icons/Home.jsx";
import Blog from "@/Assets/Icons/Blog.jsx";
import Tag from "@/Assets/Icons/Tag.jsx";
import Category from "@/Assets/Icons/Category.jsx";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Sidebar() {

    const { url, component } = usePage()

    return (
        <>

            <nav className='w-72 bg-sidebarbg'>
                <h1 className="text-white mx-auto text-4xl my-10 font-bold text-center tracking-widest">Admin</h1>
                <Menu title="Dashboard" route={route('admin.dashboard')}
                    active={route().current('admin.dashboard')}><Home /></Menu>
                <Menu title="Blog" route={route('admin.posts.index')} active={url.startsWith('/admin/posts')}><Blog /></Menu>
                <Menu title="Tags" route={route('admin.tags.index')} active={url.startsWith('/admin/tags')}><Tag /></Menu>
                <Menu title="Categories" route={route('admin.categories.index')} active={url.startsWith('/admin/categories')}><Category /></Menu>
                <Menu title="Projects" route={route('admin.categories.index')} active={url.startsWith('/admin/categories')}><Category /></Menu>
            </nav>
        </>
    )
}

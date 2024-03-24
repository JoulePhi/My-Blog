import Menu from "@/Components/Dashboard/Menu.jsx";
import { LuSquareDashedBottomCode, LuAppWindow, LuHome, LuTags, LuAlignLeft, LuBoxes } from "react-icons/lu";

import { usePage } from "@inertiajs/react";

export default function Sidebar() {

    const { url } = usePage()

    return (
        <>

            <nav className='w-72 bg-sidebarbg'>
                <h1 className="text-white mx-auto text-4xl my-10 font-bold text-center tracking-widest">Admin</h1>
                <Menu title="Dashboard" route={route('admin.dashboard')}
                    active={route().current('admin.dashboard')}><LuHome /></Menu>
                <Menu title="Blog" route={route('admin.posts.index')} active={url.startsWith('/admin/posts')}><LuAppWindow /></Menu>
                <Menu title="Tags" route={route('admin.tags.index')} active={url.startsWith('/admin/tags')}><LuTags /></Menu>
                <Menu title="Categories" route={route('admin.categories.index')} active={url.startsWith('/admin/categories')}><LuAlignLeft /></Menu>
                <Menu title="Technologies" route={route('admin.technologies.index')} active={url.startsWith('/admin/technologies')}><LuSquareDashedBottomCode /></Menu>
                <Menu title="Projects" route={route('admin.projects.index')} active={url.startsWith('/admin/projects')}><LuBoxes /></Menu>
            </nav>
        </>
    )
}

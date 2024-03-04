import Menu from "@/Components/Dashboard/Menu.jsx";
import Home from "@/Assets/Icons/Home.jsx";
import Blog from "@/Assets/Icons/Blog.jsx";
import Tag from "@/Assets/Icons/Tag.jsx";
import Category from "@/Assets/Icons/Category.jsx";

export default function Sidebar(){
    return (
        <>
            <nav className='w-72 bg-sidebarbg'>
                <h1 className="text-white mx-auto text-4xl my-10 font-bold text-center tracking-widest">Admin</h1>
                <Menu title="Dashboard" route={route('admin.dashboard')}
                      active={route().current('admin.dashboard')}><Home/></Menu>
                <Menu title="Blog" route={route('admin.blogs.index')} active={route().current('admin.blogs.index')}><Blog/></Menu>
                <Menu title="Tags" route={route('admin.tags.index')} active={route().current('admin.tags.index')}><Tag/></Menu>
                <Menu title="Categories" route={route('admin.categories.index')} active={route().current('admin.categories.index')}><Category/></Menu>
            </nav>
        </>
    )
}

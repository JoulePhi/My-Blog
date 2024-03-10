import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from "@/Components/Spinner";
const Tags = ({ tag }) => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);


    useEffect(() => {
        if (tag != null) {
            setTitle(tag.title);
            setMetaTitle(tag.meta_title);
            setContent(tag.content);
            setUpdate(true);
        }
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        setSlug(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }, [title]);


    const submitTag = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('admin.tags.store'), {
                title: title,
                slug: slug,
                meta_title: metaTitle,
                content: content,
            },);
            toast.success(response.data.message);
            setTitle('');
            setMetaTitle('');
            setContent('');
        } catch (error) {
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }

    const updateTag = async (tag) => {
        setLoading(true);
        try {
            const response = await axios.put(route('admin.tags.update', tag), {
                title: title,
                slug: slug,
                meta_title: metaTitle,
                content: content,
            },);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }



    return (
        <>
            <Head title="Add Tags" />
            <Toaster position="bottom-right" />
            <Link href={route('admin.tags.index')}
                className="text-2xl font-bold font-opensans text-slate-800 hover:underline"> {"<< Back"} </Link>


            <div className='flex justify-center'>
                <div className="w-3/4 bg-white rounded-2xl shadow-lg p-8 my-10">
                    <h1 className='font-bold text-4xl mb-10 mx-auto text-center'>{update ? "Update" : "Add"} Tags 🌟</h1>
                    <div className="grid grid-cols-2  gap-8">
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Title" onChange={handleTitleChange} value={title} />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Slug" readOnly value={slug} />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Meta Title" onChange={(e) => setMetaTitle(e.target.value)} value={metaTitle} />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content} />


                        <div className='col-span-2 flex justify-end items-center'>
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                onClick={() => update ? updateTag(tag.id) : submitTag()}
                                type="button">{loading ?
                                    <Spinner />
                                    : update ? 'Update' : 'Add'}
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


Tags.layout = (page) => <AdminLayout children={page} />

export default Tags;

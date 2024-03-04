import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import Spinner from "@/Components/Spinner.jsx";

const Categories = ({category}) => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        console.log(category);
        if(category != null){
            setTitle(category.title);
            setMetaTitle(category.meta_title);
            setUpdate(true);
        }
    }, []);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        setSlug(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }, [title]);

    const submitCategory = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('admin.categories.store'), {
                title: title,
                slug: slug,
                meta_title: metaTitle,
            },);
            toast.success(response.data.message);
            setTitle('');
            setMetaTitle('');
        } catch (error) {
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }

    const updateCategory = async (tag) => {
        setLoading(true);
        try {
            const response = await axios.put(route('admin.categories.update', tag), {
                title: title,
                slug: slug,
                meta_title: metaTitle,
            },);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }

    return (
        <>
            <Head title="Add Categories"/>
            <a href={route('admin.categories.index')}
               className="text-2xl font-bold font-opensans text-slate-800 hover:underline"> {"<< Back"} </a>

            <Toaster position="bottom-right" />
            <div className='flex justify-center'>
                <div className="w-3/4 bg-white rounded-2xl shadow-lg p-8 my-10">
                    <h1 className='font-bold text-4xl mb-10 mx-auto text-center'>{update ? "Update" : "Add"} Categories 🌟</h1>
                    <div className="grid grid-cols-2  gap-8">
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Title" onChange={handleTitleChange} value={title}/>

                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Meta Title" onChange={(e) => setMetaTitle(e.target.value)}
                            value={metaTitle}/>

                        <div className='col-span-2'>
                            <input
                                className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Slug" readOnly value={slug}/>
                        </div>



                        <div className='col-span-2 flex justify-end items-center'>
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                onClick={() => update ? updateCategory(category.id) : submitCategory()}
                                type="button">{loading ?
                                <Spinner/>
                                : update ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


Categories.layout = (page) => <AdminLayout children={page}/>

export default Categories;

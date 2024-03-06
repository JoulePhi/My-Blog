import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import MultiSelect from "@/Components/Dashboard/MultiSelect";
import RichEditor from "@/Components/Dashboard/RichEditor.jsx";
import {useEffect, useState} from "react";
import Dropzone from "@/Components/Dashboard/Dropzone";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from "@/Components/Spinner";
import { usePage } from '@inertiajs/react'

const Blogs = ({blog,tags, categories,postTagIndexes, postCategoryIndexes}) => {
    const [isWriting, setIsWriting] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [metaTitle, setMeta] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const { auth } = usePage().props
    const [image, setImage] = useState('');
    const [imageChanged, setImageChanged] = useState(false);


    useEffect(() => {
        console.log(blog)
        if (blog != null) {
            setTitle(blog.title);
            setMeta(blog.meta_title);
            setValue(blog.content);
            setUpdate(true);
            setImage(blog.thumbnail);
            setSelectedTags(postTagIndexes.map(tag => tag.value));
            setSelectedCategories(postCategoryIndexes.map(category => category.value));
        }
    }, []);




    const submitBlog = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('meta_title', metaTitle);
        formData.append('content', value);
        selectedTags.forEach(tag => formData.append('tags[]', tag));
        selectedCategories.forEach(category => formData.append('categories[]', category));
        formData.append('thumbnail', files[0]);
        formData.append('user_id', auth.user.id.toString());
        try {
            const response = await axios.post(route('admin.posts.store'), formData, {headers: {'Content-Type': 'multipart/form-data'}});
            toast.success(response.data.message);
            setTitle('');
            setMeta('');
            setValue('');
            setSelectedTags([]);
            setSelectedCategories([]);
            setFiles([]);
        }catch (error) {
            console.error(error.request.response);
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }

    const updateBlog = async (post) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', title);
        formData.append('meta_title', metaTitle);
        formData.append('content', value);
        selectedTags.forEach(tag => formData.append('tags[]', tag));
        selectedCategories.forEach(category => formData.append('categories[]', category));
        formData.append('thumbnail', imageChanged ?  files[0] : image);
        formData.append('user_id', auth.user.id.toString());

        try {
            const response = await axios.post(route('admin.posts.update', post), formData,{headers: {'Content-Type': 'multipart/form-data'}});
            toast.success(response.data.message);
        }catch (error) {
            console.error(error.request.response);
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }

    useEffect(() => {
        if(image === ''){
            setImageChanged(true);
        }else{
            setImageChanged(false);
        }
    },[image])
    return (
        <>
            <Head title="Add Blogs"/>
            <Toaster position="bottom-right" />
            <a href={route('admin.posts.index')} className="text-2xl font-bold font-opensans text-slate-800 hover:underline"> {"<< Back"} </a>


            <div className='flex justify-center'>
                <div className="w-3/4 bg-white rounded-2xl shadow-lg p-8 my-10">
                    <h1 className='font-bold text-4xl mb-10 mx-auto text-center'>Add Blogs 🌟</h1>
                    <div className="grid grid-cols-2  gap-8">
                        { isWriting ? (
                            <>
                                <div className='col-span-2  row-span-3 mb-5' >
                                    <RichEditor value={value} setValue={setValue} />
                                </div>
                                <div className='col-span-2 flex justify-end items-center'>
                                    <button
                                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                        onClick={() => setIsWriting(false)}
                                        type="button">Back
                                    </button>
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-green-400"
                                        onClick={update ?  ()=> updateBlog(blog.id) : submitBlog}
                                        type="button">{loading ?
                                        <Spinner/>
                                        : update ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input
                                    className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                                <input
                                    className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Meta Title"  value={metaTitle} onChange={(e) => setMeta(e.target.value)}/>
                                <div className="col-span-2">

                                    <Dropzone files={files} setFiles={setFiles} image={update ?  image : ''} setImage={setImage}/>

                                </div>
                                <MultiSelect options={tags} title='Select tags:' selectedOption={selectedTags} setSelectedOption={setSelectedTags} indexes={postTagIndexes} />
                                <MultiSelect options={categories} title='Select categories:' selectedOption={selectedCategories} setSelectedOption={setSelectedCategories}  indexes={postCategoryIndexes} />
                                <div className='col-span-2 flex justify-end items-center'>
                                    <button
                                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                        onClick={() => setIsWriting(true)}
                                        type="button">Start Writing ✨
                                    </button>
                                </div>


                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}


Blogs.layout = (page) => <AdminLayout children={page}/>

export default Blogs;

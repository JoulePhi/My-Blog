import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import Upload from "@/Assets/Icons/Upload";
import MultiSelect from "@/Components/Dashboard/MultiSelect";
import RichEditor from "@/Components/Dashboard/RichEditor.jsx";
import {useState} from "react";

const Blogs = () => {
    const [isWriting, setIsWriting] = useState(false);
    const tagOptions = [
        {value: '1', label: 'Laravel'},
        {value: '2', label: 'React'},
        {value: '3', label: 'Vue'},
        {value: '4', label: 'Tailwind'},
    ];

    const categoriesOptions = [
        {value: '1', label: 'Laravel'},
        {value: '2', label: 'React'},
        {value: '3', label: 'Vue'},
        {value: '4', label: 'Tailwind'},
    ];

    return (
        <>
            <Head title="Add Blogs"/>
            <a href={route('admin.blogs.index')} className="text-2xl font-bold font-opensans text-slate-800 hover:underline"> {"<< Back"} </a>


            <div className='flex justify-center'>
                <div className="w-3/4 bg-white rounded-2xl shadow-lg p-8 my-10">
                    <h1 className='font-bold text-4xl mb-10 mx-auto text-center'>Add Blogs 🌟</h1>
                    <div className="grid grid-cols-2  gap-8">
                        { isWriting ? (
                            <>
                                <div className='col-span-2  row-span-3 mb-5' >
                                    <RichEditor/>
                                </div>
                                <div className='col-span-2 flex justify-end items-center'>
                                    <button
                                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                        onClick={() => setIsWriting(false)}
                                        type="button">Back
                                    </button>
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-green-400"
                                        onClick={() => setIsWriting(false)}
                                        type="button">Submit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input
                                    className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Title"/>
                                <input
                                    className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Slug"/>
                                <div className="col-span-2">

                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file"
                                               className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-bg hover:bg-gray-100 ">
                                            <div
                                                className="flex flex-col items-center justify-center pt-5 pb-6 text-textGray">
                                                <Upload/>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                    className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or
                                                    GIF
                                                    (MAX.
                                                    800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden"/>
                                        </label>
                                    </div>

                                </div>
                                <MultiSelect options={tagOptions} title='Select tags:'/>
                                <MultiSelect options={categoriesOptions} title='Select categories:'/>
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

import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";

const Categories = () => {


    return (
        <>
            <Head title="Add Categories"/>
            <a href={route('admin.categories.index')}
               className="text-2xl font-bold font-opensans text-slate-800 hover:underline"> {"<< Back"} </a>


            <div className='flex justify-center'>
                <div className="w-3/4 bg-white rounded-2xl shadow-lg p-8 my-10">
                    <h1 className='font-bold text-4xl mb-10 mx-auto text-center'>Add Categories 🌟</h1>
                    <div className="grid grid-cols-2  gap-8">
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Title"/>
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Slug"/>
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Meta Title"/>
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Content"/>


                        <div className='col-span-2 flex justify-end items-center'>
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"

                                type="button">Submit
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

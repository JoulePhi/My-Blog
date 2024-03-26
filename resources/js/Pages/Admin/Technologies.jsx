import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import Edit from "@/Assets/Icons/Edit.jsx";
import Trash from "@/Assets/Icons/Trash.jsx";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Paginate from "@/Components/Dashboard/Paginate";
import { useEffect } from "react";
import getImage from "@/Helpers/Helpers";
const Technologies = ({ technologies }) => {

    const deleteTag = async (technology) => {
        const modalOptions = {
            title: "Confirm to Delete",
            message: "Are you sure want to delete this item?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            const response = await axios.delete(route('admin.technologies.destroy', technology.id));
                            toast.success(response.data.message);
                        } catch (error) {
                            toast.error('Something went wrong!');
                        }
                        window.location.reload();
                    }
                },
                {
                    label: "No"
                }
            ]
        };
        confirmAlert(modalOptions);

    }
    useEffect(() => {
    }, []);


    const currentPageData = technologies.data
        .map((technology, index) => {
            return (
                <tr key={index} className='border-b py-5'>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {(technologies.current_page - 1) * technologies.per_page + index + 1}
                    </th>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        <img src={getImage(technology.logo)} alt="" className="w-4 " />
                    </th>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {technology.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {technology.description}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex  ">
                        <Link href={route('admin.technologies.edit', technology.id)}
                            className="p-1 text-white bg-sky-600 rounded-lg hover:bg-sky-500  flex justify-center items-center mr-2 ">
                            <Edit />
                        </Link>
                        <button onClick={() => deleteTag(technology)}
                            className="p-1 text-white bg-red-500 hover:bg-red-400 rounded-lg   flex justify-center items-center">
                            <Trash />
                        </button>
                    </td>
                </tr>
            )
        });


    return (
        <>
            <Head title="Technologies" />
            <h1 className='font-bold text-4xl'>My Blogs 🌟</h1>
            <Toaster position="bottom-right" />
            <div className="w-full  mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Technologies</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <Link href={route('admin.technologies.create')}
                                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                    type="button">Add
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        No
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Logo
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Title
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Description
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentPageData}

                            </tbody>

                        </table>

                        <Paginate links={technologies.links} />

                    </div>
                </div>
            </div>
        </>
    )
}

Technologies.layout = page => <AdminLayout children={page} />

export default Technologies;

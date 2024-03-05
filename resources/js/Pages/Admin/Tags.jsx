import AdminLayout from "@/Layouts/AdminLayout.jsx";
import {Head} from "@inertiajs/react";
import Edit from "@/Assets/Icons/Edit.jsx";
import Trash from "@/Assets/Icons/Trash.jsx";
import toast, {Toaster} from "react-hot-toast";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {useState} from "react";
import ReactPaginate from "react-paginate";


const Tags = ({tags}) => {

    const deleteTag = async (tag) => {
        const modalOptions = {
            title: "Confirm to Delete",
            message: "Are you sure want to delete this item?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            const response = await axios.delete(route('admin.tags.destroy', tag));
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

    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 5; // Number of items per page
    const offset = currentPage * perPage;

    const currentPageData = tags
        .slice(offset, offset + perPage)
        .map( (tag,index) => {
            return (
                <tr key={index} className='border-b py-5'>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {currentPage * perPage + index + 1}
                    </th>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {tag.title}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {tag.meta_title}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {tag.slug}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-1/4 text-pretty">
                        {tag.content}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-center  whitespace-nowrap p-4 w-10">
                        {tag.posts_count}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex  ">
                        <a href={route('admin.tags.edit', tag.id)}
                           className="p-1 text-white bg-blue-600 rounded-lg hover:bg-blue-500  flex justify-center items-center mr-2 ">
                            <Edit/>
                        </a>
                        <button onClick={() => deleteTag(tag)}
                                className="p-1 text-white bg-red-500 hover:bg-red-400 rounded-lg   flex justify-center items-center">
                            <Trash/>
                        </button>
                    </td>
                </tr>
            )
        });

    const pageCount = Math.ceil(tags.length / perPage);

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage);
    }
    return (
        <>
            <Head title="Tags"/>
            <h1 className='font-bold text-4xl'>My Blogs 🌟</h1>
            <Toaster position="bottom-right"/>
            <div className="w-full  mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Tags</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <a href={route('admin.tags.create')}
                                   className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                   type="button">Add
                                </a>
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
                                    Title
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Meta Title
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Slug
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left w-1/4 ">
                                    Content
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Total Blogs
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
                        <div className='flex justify-end m-2 '>
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}

                                previousLabel="<"
                                pageClassName="hover:bg-red-200 page-item"
                                pageLinkClassName="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200"
                                previousClassName="page-item"
                                previousLinkClassName="relative block py-2 px-3 -ml-px leading-normal text-blue bg-blue-500 text-white border border-gray-200 no-underline  hover:bg-blue-400 rounded-md mr-4 "
                                nextClassName="page-item"
                                nextLinkClassName="relative block py-2 px-3 -ml-px leading-normal text-blue bg-blue-500 text-white border border-gray-200 no-underline  hover:bg-blue-400 rounded-md ml-4"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200"
                                containerClassName="flex list-reset pl-0 rounded "
                                activeClassName="underline font-bold "
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Tags.layout = page => <AdminLayout children={page}/>

export default Tags;

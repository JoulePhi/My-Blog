import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import Edit from "@/Assets/Icons/Edit";
import Trash from "@/Assets/Icons/Trash";
import Switch from '@/Components/Dashboard/Switch';
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import getImage from "@/Helpers/Helpers";
import Paginate from "@/Components/Dashboard/Paginate";

const Projects = ({ projects }) => {

    const deleteProject = async (project) => {
        const modalOptions = {
            title: "Confirm to Delete",
            message: "Are you sure want to delete this item?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            const response = await axios.delete(route('admin.projects.destroy', project.id));
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


    const currentPageData = projects.data
        .map((project, index) => {
            return (
                <tr key={index} className='border-b py-5'>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {(projects.current_page - 1) * projects.per_page + index + 1}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        <img src={project.thumbnail} alt={project.thumbnail} className="h-20 object-cover" />
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {project.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 w-full line-clamp-2 text-pretty">
                        {project.description}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs ">
                        <Link rel="stylesheet" href={project.repository_url} >{project.repository_url}</Link>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs ">
                        <Link rel="stylesheet" href={project.live_url} >{project.live_url}</Link>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        <div className="flex flex-wrap w-20 gap-2">
                            {project.technologies.map((e, i) => <span key={i}
                                className="bg-gray-100 text-pretty p-2">{e.name}</span>)}
                        </div>
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex  ">
                        <a href={route('admin.projects.edit', project.id)}
                            className="p-1 text-white bg-sky-600 rounded-lg hover:bg-sky-500  flex justify-center items-center mr-2 ">
                            <Edit />
                        </a>
                        <button onClick={() => deleteProject(project)}
                            className="p-1 text-white bg-red-500 hover:bg-red-400 rounded-lg   flex justify-center items-center">
                            <Trash />
                        </button>
                    </td>
                </tr>
            )
        });


    return (
        <>
            <Head title="Projects" />
            <Toaster position="bottom-right" />
            <h1 className='font-bold text-4xl'>My Projects 🌟</h1>
            <div className="w-full  mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl ">
                    <div className="rounded-t mb-0 p-6 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Projects</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <a href={route('admin.projects.create')}
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
                                        Thumbnail
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Description
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Repo URL
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Live URL
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Technologies
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
                        <Paginate links={projects.links} />
                    </div>
                </div>
            </div>

        </>
    )
}

Projects.layout = page => <AdminLayout children={page} />

export default Projects;

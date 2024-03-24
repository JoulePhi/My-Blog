import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import MultiSelect from "@/Components/Dashboard/MultiSelect";
import { useCallback, useEffect, useState } from "react";
import Dropzone from "@/Components/Dashboard/Dropzone";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from "@/Components/Spinner";
import { usePage } from '@inertiajs/react'

const Projects = ({ project, technologies, technologiesTech }) => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [repo, setRepo] = useState('');
    const [live, setLive] = useState('');
    const [selectedTech, setSelectedTech] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const { auth } = usePage().props
    const [image, setImage] = useState('');
    const [imageChanged, setImageChanged] = useState(false);


    useEffect(() => {
        if (project != null) {
            setName(project.name);
            setDescription(project.description);
            setRepo(project.repository_url);
            setLive(project.live_url);
            setUpdate(true);
            setImage(project.thumbnail);
            setSelectedTech(technologiesTech.map(tech => tech.value));
        }
    }, []);

    const submitBlog = useCallback(async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('repository_url', repo);
        formData.append('live_url', live);
        selectedTech.forEach(tech => formData.append('technologies[]', tech));
        formData.append('thumbnail', files[0]);

        try {
            const response = await axios.post(route('admin.projects.store'), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success(response.data.message);
            setName('');
            setDescription('');
            setRepo('');
            setLive('');
            setSelectedTech([]);
            setFiles([]);
        } catch (error) {
            console.error(error.request.response);
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }, [name, description, repo, live, selectedTech, files, auth]);



    const updateBlog = useCallback(async (post) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('_method', "PUT");
        formData.append('name', name);
        formData.append('description', description);
        formData.append('repository_url', repo);
        formData.append('live_url', live);
        selectedTech.forEach(tech => formData.append('technologies[]', tech));
        formData.append('thumbnail', imageChanged ? files[0] : image);

        try {
            const response = await axios.post(route('admin.projects.update', post), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success(response.data.message);
        } catch (error) {
            console.error(error.request.response);
            toast.error('Something went wrong!');
        }
        setLoading(false);
    }, [name, description, repo, live, selectedTech, files, auth]);

    useEffect(() => {
        if (image === '') {
            setImageChanged(true);
        } else {
            setImageChanged(false);
        }
    }, [image])
    return (
        <>
            <Head title="Add Projects" />
            <Toaster position="bottom-right" />
            <Link href={route('admin.projects.index')} className="text-2xl font-bold font-opensans text-slate-800 hover:underline"> {"<< Back"} </Link>


            <div className='flex justify-center'>
                <div className="w-3/4 bg-white rounded-2xl shadow-lg p-8 my-10">
                    <h1 className='font-bold text-4xl mb-10 mx-auto text-center'>Add Projects 🌟</h1>
                    <div className="grid grid-cols-2  gap-8">
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Repo URL" onChange={(e) => setRepo(e.target.value)} value={repo} />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Live URL" value={live} onChange={(e) => setLive(e.target.value)} />
                        <div className="col-span-2">
                            <Dropzone files={files} setFiles={setFiles} image={update ? image : ''} setImage={setImage} />
                        </div>
                        <div className="col-span-2">
                            <MultiSelect options={technologies} title='Select technologies:' selectedOption={selectedTech} setSelectedOption={setSelectedTech} indexes={technologiesTech} />
                        </div>
                        <div className='col-span-2 flex justify-end items-center'>
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                onClick={() => update ? updateBlog(project.id) : submitBlog()}
                                type="button">{loading ? <Spinner /> : update ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


Projects.layout = (page) => <AdminLayout children={page} />

export default Projects;

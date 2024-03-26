import AdminLayout from "@/Layouts/AdminLayout.jsx";
import { Head, Link } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useEffect, useState } from "react";
import Dropzone from "@/Components/Dashboard/Dropzone";
import Spinner from "@/Components/Spinner";


const About = ({ about }) => {
    const [update, setUpdate] = useState(false);
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [cv, setCv] = useState(null);
    useEffect(() => {
        console.log(about)
        if (about != null) {
            setUpdate(true);
            setName(about.name);
            setTitle(about.title);
            setDescription(about.description);
            setImage(about.image);
        }
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", files[0]);
            formData.append("cv", cv);
            if (update) {
                formData.append("_method", "PUT");
                const response = await axios.post(route("admin.about.update", about.id), formData);
                toast.success(response.data.message);
            } else {
                const response = await axios.post(route("admin.about.store"), formData);
                toast.success(response.data.message);
                setUpdate(true);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        setLoading(false);
    }

    return (
        <>
            <Head title="About" />
            <Toaster position="bottom-right" />
            <h1 className="font-bold text-4xl">My About 🌟</h1>
            <div className="w-full  mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 row-span-2">
                            <Dropzone files={files} setFiles={setFiles} image={image} setImage={setImage} />
                        </div>
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder=" Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="col-span-2">
                            <textarea
                                className="w-full bg-bg text-gray-900 mt-2 p-3 rounded-lg border-none focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <input
                                type="file"
                                name="file-input"
                                id="file-input"
                                class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
                                file:bg-bg file:border-0
                                file:me-4
                                file:py-3 file:px-4"
                                onChange={(e) => setCv(e.target.files[0])}
                            />
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-indigo-400"
                                onClick={handleSubmit}
                                type="button">{loading ? <Spinner /> : update ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

About.layout = (page) => <AdminLayout children={page} />;

export default About;

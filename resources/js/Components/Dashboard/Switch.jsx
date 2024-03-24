import React, {useEffect, useState} from 'react'
import toast from "react-hot-toast";
const Switcher = ({blog}) => {
    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        setIsChecked(blog.is_published);
    },[blog])


    const handleCheckboxChange = async () => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            const response = await axios.post(route('admin.post.publish', blog.id), formData,{headers: {'Content-Type': 'multipart/form-data'}});
            console.log(response)
            toast.success(response.data.message);
            setIsChecked(response.data.post);
        }catch (error) {
            console.error(error.request.response);
            toast.error('Something went wrong!');
        }
    }



    return (
        <>
            <label className='flex cursor-pointer select-none items-center'>
                <div className='relative'>
                    <input
                        type='checkbox'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className='sr-only'
                    />
                    <div
                        className={`box block h-8 w-14 rounded-full ${
                            isChecked ? 'bg-sidebarbg' : 'bg-gray-300'
                        }`}
                    ></div>
                    <div
                        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                            isChecked ? 'translate-x-full' : ''
                        }`}
                    ></div>
                </div>
            </label>
        </>
    )
}

export default Switcher

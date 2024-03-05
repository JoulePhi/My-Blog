import Upload from "@/Assets/Icons/Upload.jsx";

import {useDropzone} from 'react-dropzone'
export default function Dropzone({setFiles, files, image, setImage}){


    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });



    if(files.length > 0 || image.length > 0){
        console.log(image)
        return (
            <div className="flex items-center justify-center relative">
                <div className="w-full h-64 relative bg-gray-100 rounded-lg">
                    <img src={ image.length > 0 ? window.location.origin + `/storage/` + image.slice(6)   : files[0].preview} alt="preview" className="w-full h-full rounded-lg object-cover"/>
                </div>

                <div className='absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center -top-2 -right-2 text-white font-bold hover:cursor-pointer' onClick={() => {
                    setFiles([]);
                   setImage('')
                }}>
                    X
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <div   {...getRootProps({className: 'dropzone flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-bg hover:bg-gray-100 '})}
                >
                    <div
                        className="flex flex-col items-center justify-center pt-5 pb-6 text-textGray">
                        <Upload/>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                            className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or WEBP only</p>
                    </div>
                    <input  {...getInputProps()}/>
                </div>
            </div>

        </>
    )
}

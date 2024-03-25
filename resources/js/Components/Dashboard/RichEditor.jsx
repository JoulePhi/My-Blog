import React, { useMemo, useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from "quill"; // import styles


import toast, { Toaster } from 'react-hot-toast';
import { getImage } from '@/Helpers/Helpers';


const Font = Quill.import('attributors/style/font');
Font.whitelist = ['poppins', 'open-sans', 'sans-serif'];
Quill.register(Font, true);


function RichTextEditor({ value, setValue }) {
    const quillRef = useRef();

    const imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            console.log(file)
            formData.append('image', file);

            const range = quillRef.current.getEditor().getSelection(true);
            quillRef.current.getEditor().insertEmbed(range.index, 'image', getImage('images/shimmer.gif'));


            try {
                const response = await axios.post(route('upload.content'), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                const data = response.data.location;
                quillRef.current.getEditor().deleteText(range.index, 1);
                quillRef.current.getEditor().insertEmbed(range.index, 'image', getImage(data));
                console.log(response);
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong!');
            }

        };
    };


    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': ['poppins', 'open-sans', 'sans-serif'] }],
                [{ 'align': [] }],
                ['image'],
                ['link'],
                ['formula']

                ['clean']
            ],
            handlers: {
                image: imageHandler,
            },
        }
    }), [])



    return (
        <>
            <Toaster position="bottom-right" />
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className='flex-1' ref={quillRef} />
        </>
    );
}

export default RichTextEditor;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from "quill"; // import styles
const Font = Quill.import('attributors/style/font');
Font.whitelist = ['poppins', 'open-sans', 'sans-serif'];
Quill.register(Font, true);
function RichTextEditor({value, setValue}) {


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font':['poppins', 'open-sans', 'sans-serif']}],
            [{ 'align': [] }],
            ['image'],
            ['link'],
            ['formula']

            ['clean']                                         // remove formatting button
        ],
    };

    return (
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className='h-80' />
    );
}

export default RichTextEditor;


import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { getImage } from "@/Helpers/Helpers";

export default function Comment({ post }) {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [replyEmail, setReplyEmail] = useState('');
    const [replyTitle, setReplyTitle] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [loading, setLoading] = useState(false);

    const [replyFormOpen, setReplyFormOpen] = useState(null);
    useEffect(() => {
        fetchComments();
    }, []);

    const toggleReplyForm = (i) => {
        console.log(replyFormOpen)
        if (replyFormOpen === i) {
            setReplyFormOpen(null);
        } else {
            setReplyFormOpen(i);
        }
    }



    const fetchComments = async () => {
        try {
            const response = await axios.get(route('comment.get'), { params: { post_id: post.id } });
            setComments(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const publishComment = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('post_id', post.id);
        try {
            await axios.post(route('comment'), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success("Comment Published");

            setEmail('');
            setTitle('');
            setContent('');
            fetchComments();
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }
    const replyComment = async (parent) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('email', replyEmail);
        formData.append('title', replyTitle);
        formData.append('content', replyContent);
        formData.append('post_id', post.id);
        formData.append('parent_id', parent.id);
        try {
            await axios.post(route('comment'), formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success("Reply Success");

            setReplyEmail('');
            setReplyTitle('');
            setReplyContent('');
            fetchComments();
            toggleReplyForm(null);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Toaster position="bottom-right" />
            <section className="bg-gray-50  py-8 lg:py-16 antialiased">
                <div className="w-full mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-purple text-xl mb-5">Comments ({comments.length})</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="py-2 px-4  bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                            <input type="email" name='email' id='email' className="px-0 w-full lg:text-sm text-xs text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 " placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="py-2 px-4  bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                            <input type="text" name='title' id='title' className="px-0 w-full lg:text-sm text-xs text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 " placeholder="Title" value={title}
                                onChange={(e) => { setTitle(e.target.value) }} />
                        </div>

                        <div className="col-span-2">
                            <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                                <textarea rows="6" name='content' id='content'
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 "
                                    placeholder="Write a comment..." value={content} onChange={(e) => { setContent(e.target.value) }} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" onClick={publishComment} disabled={loading}
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple rounded-lg focus:ring-4 focus:ring-purple/20  hover:bg-purple/80 mb-6">
                        Post comment
                    </button>
                    {
                        comments.map((comment, i) => (
                            <>
                                <article className="p-6 text-base bg-gray-50 rounded-lg " key={i}>
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 lg:text-sm text-xs text-gray-900  font-semibold"><img
                                                class="mr-2 w-6 h-6 rounded-full"
                                                src={getImage('images/pp.jpg')}
                                            />{comment.email}</p>
                                            <p className="lg:text-sm text-xs text-gray-600 "><time pubdate datetime="2022-02-08"
                                                title="February 8th, 2022">{new Date(comment.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time></p>
                                        </div>

                                    </footer>
                                    <h2 className="text-sidebarbg font-bold text-base lg:text-xl mb-2">{comment.title}</h2>
                                    <p className="text-grey sm:text-xs">{comment.content}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <button type="button" onClick={() => toggleReplyForm(comment.id)}
                                            className="flex items-center lg:text-sm text-xs text-gray-500 hover:underline  font-medium">
                                            <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                            </svg>
                                            Reply
                                        </button>
                                    </div>
                                    {replyFormOpen === comment.id && (
                                        <>
                                            <div className="grid grid-cols-2 gap-6 mt-5">
                                                <div className="py-2 px-4  bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                                                    <input type="email" name='email' id='email' className="px-0 w-full lg:text-sm text-xs text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 " placeholder="Your Email" value={replyEmail} onChange={(e) => setReplyEmail(e.target.value)} />
                                                </div>
                                                <div className="py-2 px-4  bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                                                    <input type="text" name='title' id='title' className="px-0 w-full lg:text-sm text-xs text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 " placeholder="Title" value={replyTitle}
                                                        onChange={(e) => { setReplyTitle(e.target.value) }} />
                                                </div>

                                                <div className="col-span-2">
                                                    <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                                                        <textarea name='content' id='content'
                                                            className="px-0 w-full lg:text-sm text-xs text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 "
                                                            placeholder="Write a comment..." value={replyContent} onChange={(e) => { setReplyContent(e.target.value) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="submit" onClick={() => replyComment(comment)} disabled={loading}
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple rounded-lg focus:ring-4 focus:ring-purple/20  hover:bg-purple/80 mb-6">
                                                Reply
                                            </button>
                                        </>
                                    )}
                                </article>

                                {
                                    comment.comments.map((reply, j) => (
                                        <article className="p-6 text-base bg-gray-50 rounded-lg ml-6 " key={i}>
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 lg:text-sm text-xs text-gray-900  font-semibold"><img
                                                        class="mr-2 w-6 h-6 rounded-full"
                                                        src={getImage('images/pp.jpg')}
                                                    />{reply.email}</p>
                                                    <p className="lg:text-sm text-xs text-gray-600 "><time pubdate datetime="2022-02-08"
                                                        title="February 8th, 2022">{new Date(reply.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time></p>
                                                </div>

                                            </footer>
                                            <h2 className="text-sidebarbg font-bold text-xl mb-2">{reply.title}</h2>
                                            <p className="text-grey ">{reply.content}</p>


                                        </article>
                                    ))
                                }
                            </>

                        ))
                    }

                </div>
            </section>
        </>
    )
}
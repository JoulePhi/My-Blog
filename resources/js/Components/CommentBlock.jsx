



export default function CommentBlock({ comment, toggleReplyForm, replyFormOpen, setReplyEmail, setReplyTitle, setReplyContent, replyEmail, replyTitle, replyContent, replyComment, loading, getImage, i }) {
    return (
        <>
            <article className="p-6 text-base bg-gray-50 rounded-lg " key={i}>
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold"><img
                            class="mr-2 w-6 h-6 rounded-full"
                            src={getImage('images/pp.jpg')}
                        />{comment.email}</p>
                        <p className="text-sm text-gray-600 "><time pubdate datetime="2022-02-08"
                            title="February 8th, 2022">{new Date(comment.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time></p>
                    </div>

                </footer>
                <h2 className="text-sidebarbg font-bold text-xl mb-2">{comment.title}</h2>
                <p className="text-grey ">{comment.content}</p>
                <div className="flex items-center mt-4 space-x-4">
                    <button type="button" onClick={() => toggleReplyForm(comment.id)}
                        className="flex items-center text-sm text-gray-500 hover:underline  font-medium">
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
                                <input type="email" name='email' id='email' className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 " placeholder="Your Email" value={replyEmail} onChange={(e) => setReplyEmail(e.target.value)} />
                            </div>
                            <div className="py-2 px-4  bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                                <input type="text" name='title' id='title' className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 " placeholder="Title" value={replyTitle}
                                    onChange={(e) => { setReplyTitle(e.target.value) }} />
                            </div>

                            <div className="col-span-2">
                                <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border-2 border-gray-200  ">
                                    <textarea name='content' id='content'
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-gray-50 "
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
                    <CommentBlock
                ))
            }
        </>
    )

}
import { Link } from "@inertiajs/react";




export default function ProjectCard({ project }) {

    return (
        <>
            <div className=' flex flex-col bg-white shadow-lg rounded-xl h-[28rem]  overflow-hidden' >
                <Link className="w-full h-1/2" href={'/project/' + project.name}><img src={project.thumbnail} className=' object-cover  w-full h-full'
                    alt="" /></Link>
                <div className='flex flex-col  justify-between  p-4 flex-grow '>

                    <Link href={'/project/' + project.slug} className="font-semibold text-xl lg:text-2xl text-sidebarbg line-clamp-2 hover:underline">{project.name}</Link>
                    <p className="text-grey line-clamp-2 text-sm">{project.description}</p>
                    <div className='w-full overflow-hidden'>
                        <div className='flex gap-4 overflow-y-auto scrollbar-hide'>
                            {
                                project.technologies.map((technology, i) => (
                                    <Link href={"/technology/" + technology.name} key={i} className={`text-purple bg-purple/5 font-medium px-4 py-1 rounded-full text-xs line-clamp-1 text-ellipsis text-nowrap hover:underline`}>{technology.name}</Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
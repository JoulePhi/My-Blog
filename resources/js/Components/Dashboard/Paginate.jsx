import { Link } from "@inertiajs/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";


export default function Paginate({ links }) {
    return (
        <>
            <div className='flex justify-end m-5  '>
                <div className="flex items-center justify-between">
                    <Link href={links[0].url} className='mx-1 px-3 py-2 border border-gray-300 rounded-md bg-purple text-white font-poppins hover:bg-purple/90'>
                        <LuChevronLeft />
                    </Link>

                    <div>
                        {links.slice(Math.max(1, links.findIndex(link => link.active) - 2), links.findIndex(link => link.active) + 3).map((link, index) => (
                            <Link href={link.url} key={index} className={`mx-1 px-3 py-2 border border-gray-300 rounded-md  ${link.active ? 'underline text-black' : 'text-blue'}`} dangerouslySetInnerHTML={{ __html: `${link.label}` }} />
                        ))}
                    </div>

                    <Link href={links[links.length - 1].url} className='mx-1 px-3 py-2 border border-gray-300 rounded-md bg-purple text-white font-poppins hover:bg-purple/90' >
                        <LuChevronRight />
                    </Link>
                </div>
            </div>
        </>
    )
}
import { Link } from "@inertiajs/react";

export default function Menu({ active, title, route, children }) {

    if (active) {
        return (
            <>
                <Link href={route} className='flex p-6 text-white items-center bg-activeMenu border-l-4 border-textDark'>
                    {children}
                    <span className='text-textDark ml-8 text-lg font-semibold'>{title}</span>
                </Link>
            </>
        );
    }
    return (
        <>
            <Link href={route} className='flex p-6 text-textGray items-center border-l-4 border-transparent '>
                {children}
                <span className='ml-8 text-lg font-semibold'>{title}</span>
            </Link>

        </>
    );
}

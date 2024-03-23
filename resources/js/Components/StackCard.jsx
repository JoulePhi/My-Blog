








export default function StackCard({ url, children }) {
    return (
        <>
            <a href={url} target="_blank" className=" backdrop-blur-sm p-3 rounded-full shadow-md lg:w-16 lg:h-16 w-12 h-12 border hover:-translate-y-2 hover:cursor-pointer duration-200 transition-all dark:bg-darkContainer dark:border-darkContainer ">{children}</a>
        </>
    )
}
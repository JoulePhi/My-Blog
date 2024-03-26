import getImage from "@/Helpers/Helpers";









export default function StackCard({ tech }) {
    return (
        <>
            <span className=" backdrop-blur-sm p-3 rounded-full shadow-md lg:w-16 lg:h-16 w-12 h-12 border hover:-translate-y-2 hover:cursor-pointer duration-400 transition-all dark:bg-darkContainer dark:border-darkContainer "><img src={getImage(tech.logo)} className="w-full h-full object-contain" /></span>
        </>
    )
}
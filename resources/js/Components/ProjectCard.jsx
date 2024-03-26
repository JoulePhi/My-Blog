import getImage from "@/Helpers/Helpers";
import { AnimatePresence, motion, LayoutGroup, AnimateSharedLayout } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export default function ProjectCard({ project, selected, setSelected }) {

    return (
        <>
            <LayoutGroup >
                <motion.div className=' flex flex-col bg-white dark:bg-darkContainer shadow-lg rounded-xl h-[28rem]  overflow-hidden' onClick={(e) => { setSelected(project.id); document.body.style.overflow = 'hidden' }} layoutId={`container-${project.id}`} >
                    <motion.img src={getImage(project.thumbnail)} className=' object-cover w-full h-1/2 '
                        alt="" layoutId={`img-${project.id}`} />
                    <div className='flex flex-col  justify-between  p-4 flex-grow '>

                        <motion.h1 className="font-semibold text-xl lg:text-2xl text-sidebarbg line-clamp-2 hover:underline hover:cursor-pointer dark:text-textDark" layoutId={`name-${project.id}`}>{project.name}</motion.h1>
                        <motion.p className="text-grey line-clamp-2 text-sm" layoutId={`desc-${project.id}`}>{project.description}</motion.p>
                        <div className='w-full overflow-hidden'>
                            <motion.div className='flex gap-2 overflow-y-auto scrollbar-hide' layoutId={`tech-${project.id}`}>
                                {
                                    project.technologies.slice(0, 3).map((technology, i) => (
                                        <span className=" backdrop-blur-sm p-2 my-2 rounded-full shadow-md lg:w-10 lg:h-10 w-10 h-10 border  duration-200 transition-all dark:bg-darkBg dark:border-darkContainer " key={i}><img src={getImage(technology.logo)} className="w-full h-full object-contain" alt="" /></span>
                                    ))
                                }
                                {
                                    project.technologies.length > 3 && <span className="text-purple bg-purple/5 font-medium w-10 h-10  flex items-center justify-center rounded-full text-xs">+ {project.technologies.length - 3} </span>
                                }
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {
                        selected == project.id && (
                            <motion.div className={` opacity-0 z-50 fixed  w-full h-full top-0 left-0 flex justify-center items-center bg-black/50  backdrop-blur-sm`} initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                transition={{ duration: 0.2 }} >
                                <motion.div className="relative bg-white dark:bg-darkContainer rounded-2xl shadow w-full h-[32rem] lg:h-auto mx-5 lg:mx-0  md:w-2/3  xl:w-1/3 overflow-hidden flex flex-col" layoutId={`container-${project.id}`}>
                                    <div className="relative w-full ">
                                        <motion.img src={getImage(project.thumbnail)} alt="" className="w-full aspect-video object-cover" layoutId={`img-${project.id}`} />
                                        <button className="top-4 bg-white rounded-full p-2 right-4 absolute dark:bg-darkContainer dark:text-white" onClick={() => { setSelected(null); document.body.style.overflow = 'unset' }}><IoMdClose />
                                        </button>

                                    </div>
                                    <div className=" w-full h-full font-medium px-2 py-6 flex-grow flex flex-col justify-between  ">
                                        <motion.h1 className="font-poppins font-bold   text-lg lg:text-2xl  left-4 text-white mr-1 lg:mr-0" layoutId={`name-${project.id}`} >{project.name}</motion.h1>
                                        <motion.p layoutId={`desc-${project.id}`} className="dark:text-textDark font-light my-2 text-sm lg:text-base overflow-scroll scrollbar-hide">{project.description}</motion.p>
                                        <motion.div className='flex gap-2 overflow-y-auto scrollbar-hide  flex-wrap my-2' layoutId={`tech-${project.id}`}>
                                            {
                                                project.technologies.map((technology, i) => (
                                                    <span className=" backdrop-blur-sm p-[10px] my-2 rounded-full shadow-md lg:w-12 lg:h-12 w-10 h-10 border  duration-200 transition-all dark:bg-darkBg dark:border-darkContainer " key={i}><img src={getImage(technology.logo)} className="w-full h-full object-contain" alt="" /></span>
                                                ))
                                            }
                                        </motion.div>
                                    </div>

                                </motion.div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </LayoutGroup>

        </>
    )
}
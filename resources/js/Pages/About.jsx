import getImage from "@/Helpers/Helpers";
import Authenticated from "@/Layouts/AuthenticatedLayout";
// import { ReactComponent as Logo } from "@/Assets/Icons/laravel.svg";
import Arduino from "@/Assets/Icons/Arduino";
import Laravel from "@/Assets/Icons/Laravel";
import Flutter from "@/Assets/Icons/Flutter";
import Tailwind from "@/Assets/Icons/Tailwind";
import ReactI from "@/Assets/Icons/React";
import Php from "@/Assets/Icons/Php";
import Python from "@/Assets/Icons/Python";
import Dart from "@/Assets/Icons/Dart";
import ProjectCard from "@/Components/ProjectCard";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Head, Link } from "@inertiajs/react";
import StackCard from "@/Components/StackCard";
import { useState } from "react";
import axios from "axios";

const About = ({ projects, about }) => {
    const [selected, setSelected] = useState(null)
    const downloadCv = async () => {
        await axios.get(route('cv'));
    }
    return (
        <>
            <Head title="About" />
            <div className="flex lg:h-[40rem] h-[50rem] flex-col-reverse lg:flex-row  w-full lg:py-10  overflow-hidden lg:justify-between">
                <div className="flex flex-col lg:w-1/2 w-full justify-center gap-10">
                    <h1 className="font-bold font-poppins text-purple  text-base lg:text-xl">{about.title}</h1>
                    <span className="text-sidebarbg font-semibold text-2xl lg:text-3xl dark:text-textDark">{about.name}</span>
                    <p className="text-grey ">{about.description}</p>
                    <a
                        href={route('cv')}
                        download
                        className="bg-purple text-white  text-xs border text-center border-transparent font-bold uppercase px-6 py-4 rounded-lg outline-none focus:outline-none  ease-linear transition-all duration-150 hover:bg-transparent hover:text-purple hover:border-purple w-1/3"
                        type="button">Download CV
                    </a>
                    <div className="flex text-3xl text-sidebarbg gap-2">
                        <a className="hover:text-[#0077b5] dark:text-[#0077b5] dark:hover:text-darkContainer" href="https://linkedin.com/in/dzulfikar-sadid" target="_blank" ><FaLinkedin /></a>
                        <a className="hover:text-[#171515] dark:text-white dark:hover:text-darkContainer" href="https://github.com/joulephi" target="_blank"><FaGithub /></a>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full h-1/2 lg:h-full overflow-hidden flex justify-center items-center   mb-10 lg:mb-0">
                    <div className={`rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]   shadow-inner  bg-purple  bg-cover bg-no-repeat  lg:w-[70%] lg:h-[70%] w-full h-full md:w-[50%]  bg-[center_top_1rem]`} style={{ backgroundImage: `url('/storage/${about.image}')` }} ></div>

                </div>
            </div>

            <h1 className='font-bold mb-8  text-lg lg:text-2xl  my-10 uppercase dark:text-textDark'>Tech Stack  </h1>
            <div className='flex   my-10 gap-4 justify-center lg:justify-start items-center flex-wrap'>
                <StackCard url="https://laravel.com"><Laravel /></StackCard>
                <StackCard url="https://flutter.dev"><Flutter /></StackCard>
                <StackCard url="https://react.dev"><ReactI /></StackCard>
                <StackCard url="https://tailwindcss.com"><Tailwind /></StackCard>
                <StackCard url="https://arduino.cc"><Arduino /></StackCard>
                <StackCard url="https://dart.dev"><Dart /></StackCard>
                {/* <StackCard url="https://php.net"><Php /></StackCard> */}

            </div>
            <h1 className='font-bold mb-8 text-lg lg:text-2xl my-10 uppercase dark:text-textDark'>Projects</h1>

            <div className='flex flex-col items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 h-[full]  mb-10'>
                {projects.data.map((project, i) => (
                    <ProjectCard project={project} key={i} selected={selected} setSelected={setSelected} />
                ))}
            </div>
        </>
    )
}

About.layout = page => <Authenticated children={page} header="About" />
export default About;
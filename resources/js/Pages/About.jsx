import { getImage } from "@/Helpers/Helpers";
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



const About = () => {
    const size = 50;
    return (
        <>
            <div className="flex h-[40rem]  w-full p-10 overflow-hidden justify-between">
                <div className="flex flex-col w-1/2 justify-center gap-10">
                    <h1 className="font-bold font-poppins text-purple text-xl">Fullstack Developer • Mobile Developer</h1>
                    <span className="text-sidebarbg font-semibold text-3xl">Dzulfikar Sadid Khoir</span>
                    <p>I specialize in backend development, where technology and innovation unite, while also having the capacity to create mobile apps using Flutter and craft IoT projects</p>
                    <button className="bg-purple text-white font-semibold w-fit px-6 py-3 border border-purple rounded-lg hover:bg-transparent hover:text-purple">Contact Me</button>
                </div>

                <div className="w-1/2 h-full overflow-hidden flex justify-center items-start relative ">
                    <img src={getImage('images/me-porto.png')} alt="" className="z-10" />
                    <span className="absolute bottom-10 right-28  backdrop-blur-sm p-4 rounded-full shadow-xl z-20 animate-float"><Arduino width={size} height={size} /></span>
                    <span className="absolute top-10 left-32  backdrop-blur-sm p-4 rounded-full shadow-xl animate-float"><Laravel width={size} height={size} /></span>
                    <span className="absolute top-10 right-32  backdrop-blur-sm p-4 rounded-full shadow-xl animate-float"><Flutter width={size} height={size} /></span>
                    <span className="absolute bottom-10 left-32  backdrop-blur-sm p-4 rounded-full shadow-xl animate-float"><Tailwind width={size} height={size} /></span>
                    <span className="absolute top-56 left-10  backdrop-blur-sm p-4 rounded-full shadow-xl animate-float"><ReactI width={size} height={size} /></span>
                    <span className="absolute top-56 right-10  backdrop-blur-sm p-4 rounded-full shadow-xl animate-float"><Dart width={size} height={size} /></span>
                    {/* <span className="absolute"><Python width={size} height={size} /></span> */}
                </div>
            </div>

            <div className='flex flex-col items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 h-[full]  mb-10'>

            </div>
        </>
    )
}

About.layout = page => <Authenticated children={page} />
export default About;
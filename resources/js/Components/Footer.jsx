import Logo from "@/Assets/Icons/Logo"


export default function Footer() {
    return (




        <footer class="bg-gray-50    mt-20">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href="https://itsmejoule.web.app/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="fill-purple mr-5"><Logo /></span>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap ">Dzulfikar Sadid</span>
                    </a>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center ">© 2024 <a href="https://itsmejoule.web.app/" class="hover:underline">Dzulfikar Sadid</a>. All Rights Reserved.</span>
            </div>
        </footer>



    )
}
import { Head } from '@inertiajs/react'
import Sidebar from '@/Components/Dashboard/Sidebar'
import Navbar from "@/Components/Dashboard/Navbar";

export default function AdminLayout({ children }) {
    return (
        <>
            <Head title="Admin" />
            <div className="flex h-screen bg-bg">
                <Sidebar />
                <main className="flex-1 ">
                    <div className="h-screen flex flex-col">
                        <Navbar />
                        <div className="overflow-y-auto flex-grow px-12 py-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

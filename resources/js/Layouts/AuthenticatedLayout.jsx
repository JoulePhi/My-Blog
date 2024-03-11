import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import Footer from '@/Components/Footer';
export default function Authenticated({ user, header, children }) {

    return (
        <>
            <Head title={header} />
            <Navbar />
            <div className="xl:px-64 px-5 bg-gray-50 mx-auto mt-32">

                <main>{children}</main>
            </div>

            <Footer />
        </>
    );
}

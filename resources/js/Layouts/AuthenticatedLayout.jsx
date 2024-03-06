import { useState } from 'react';
import {Head, Link} from '@inertiajs/react';
import Navbar from "@/Components/Navbar";

export default function Authenticated({ user, header, children }) {

    return (
            <>
                <Head title={header}/>
                <div className="px-20 bg-white">
                    <Navbar/>
                    <main>{children}</main>
                </div>
            </>
    );
}

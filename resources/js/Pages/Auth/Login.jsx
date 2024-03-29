import { useEffect } from 'react';
import Logo from '@/Assets/Icons/Logo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />
            <section class="bg-gray-50 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <span class="flex items-center mb-6 text-2xl font-semibold text-gray-900 fill-purple">
                        <Logo />
                    </span>
                    <div class="w-full bg-white rounded-xl shadow-lg  md:mt-0 sm:max-w-md xl:p-0  ">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Welcome Admin
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={submit}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" name="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple focus:border-purple block w-full p-2.5 " placeholder="name@company.com" required="" />
                                    {errors.email && <p class="text-sm text-red-500">{errors.email}</p>}
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" value={data.password} onChange={(e) => { setData('password', e.target.value) }} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple focus:border-purple block w-full p-2.5 " required="" />
                                    {errors.password && <p class="text-sm text-red-500">{errors.password}</p>}
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple checked:bg-purple " required="" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-500 ">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" class="text-sm font-medium text-purple hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" class="w-full text-white bg-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center " disabled={processing}>Sign in</button>
                                <p class="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <a href="#" class="font-medium text-purple hover:underline ">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

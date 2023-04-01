import Head from 'next/head'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';

import { Store } from '@/context/Store';
import { useSession } from 'next-auth/react';

const Layout = ({ children, title }) => {

    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.qty, 0))
    }, [cart.cartItems])

    return (
        <>
            <Head>
                <title>{title ? title + ' - Robotz' : 'Robotz'}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position='bottom-center' limit={1} />

            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 justify-between shadow-md items-center px-4'>
                        <Link href="/" className="text-lg font-bold">
                            RobotZ
                        </Link>
                        <div>
                            <Link className="p-2" href="/Cart">
                                Cart:
                                {cartItemsCount > 0 && (
                                    <span className='ml-1 rounded-full bg-pink-500 px-2
                                     py-1 text-xs font-bold text-white'>
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>
                            {status === 'loading'
                                ? ('LOADING...')
                                : session?.user
                                    ? session.user.name
                                    : (
                                        <Link href="/Login" className="p-2">Login</Link>
                                    )
                            }
                        </div>
                    </nav>
                </header>
                <main className='container m-auto mt-4 px-4'>{children}</main>
                <footer className='flex justify-center items-center h-10 shadow-inner'>
                    footer
                </footer>
            </div>
        </>
    )
}

export default Layout
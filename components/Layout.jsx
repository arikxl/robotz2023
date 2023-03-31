import Head from 'next/head'
import Link from 'next/link'

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ? title + ' - Robotz' : 'Robotz'}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 justify-between shadow-md items-center px-4'>
                        <Link href="/" className="text-lg font-bold">
                            RobotZ
                        </Link>
                        <div>
                            <Link className="p-2" href="/cart">Cart</Link>
                            <Link className="p-2" href="/login">Login</Link>
                        </div>
                    </nav>
                </header>
                <main className='container m-auto mt-4 px-4'>{children}</main>
                <footer className='flex justify-center items-center h-10 shadow-inner'>footer</footer>
            </div>
        </>
    )
}

export default Layout
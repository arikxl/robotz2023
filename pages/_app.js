import { useRouter } from 'next/router'
import { SessionProvider, useSession } from 'next-auth/react'

import '@/styles/globals.css';
import { StoreProvider } from '@/context/Store'

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  
  function Auth({ children }) {
    const router = useRouter();
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/Unauthorized?message=login required');
      }
    })
    if(status==='loading') return <div>LOADING...</div>
    return children;
  } 

  return (
    <SessionProvider session={session }>
      <StoreProvider>
        {Component.auth
          ? (<Auth><Component {...pageProps} /></Auth>)
          : (<Component {...pageProps} />)
        }
      </StoreProvider>
    </SessionProvider>
  )
}



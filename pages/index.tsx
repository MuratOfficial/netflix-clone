
import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';


export async function getServerSideProps(context: NextPageContext) {
const session = await getSession(context);

if(!session) {
  return {
    redirect: {
destination: '/auth',
permanent: false,
    }
  }
}

return {
  props: {},
}
}


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const {data:user} = useCurrentUser();

  return (
    <div>
<h1 className='text-2xl text-green-500'>Netflix Clone</h1>
<p className=' text-white'>Logged in as {user?.email}</p>
<button className='f-10 w-16 bg-slate-400 ' onClick={()=>signOut()}>Log out</button>
    </div>
    
  )
}

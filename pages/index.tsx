
import Billboard from '@/components/Billboard';
import Navbar from '@/components/Navbar';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import MovieList from '@/components/MovieList';


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
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </div>
    
  )
}

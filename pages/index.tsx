
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';

import Billboard from '../components/Billboard';
import InfoModal from '../components/InfoModal';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import useFavorites from '../hooks/useFavorites';
import useInfoModalStore from '../hooks/useInfoModal';
import useMovieList from '../hooks/useMovieList';

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
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </div>
    
  )
}

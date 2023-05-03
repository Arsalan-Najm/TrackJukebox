import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect, useRef, useState } from 'react';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import axios from 'axios';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';

function TopPlay() {
  const topPlayRef = useRef();
  const [topPlays, setTopPlays] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const { activeSong, setCurrentlyPlaying, audioRef, setPlaying, setActiveSong } = useAppContext();
  useEffect(() => {
    const getTopPlays = async () => {
      const response = await axios.get('/api/chart');
      setTopPlays(response.data.tracks.data);
    };
    const getTopArtists = async () => {
      const response = await axios.get('/api/chart');
      setTopArtists(response.data.artists.data);
    };
    getTopPlays();
    getTopArtists();
  }, []);
  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setCurrentlyPlaying(true);
    } else {
      audioRef.current.pause();
      setCurrentlyPlaying(false);
    }
  };
  return (
    <div
      ref={topPlayRef}
      className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[390px] max-w-full flex flex-col mx-6 z-50'
    >
      <div className='w-full flex flex-col pt-5'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-secondary-100 font-bold text-xl'>Top Charts</h1>
          <Link to='/'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        {topPlays?.map((song, i) => (
          <div
            key={i}
            className={`w-full flex flex-row items-center hover:bg-main-100 ${
              activeSong?.title === song?.title ? 'bg-main-100' : 'bg-transparent'
            } py-2 p-4 rounded-lg cursor-pointer mb-2`}
          >
            <h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>
            <div className=' flex flex-col gap-2 '>
              <img className='w-20 h-20 rounded-lg' src={song?.album?.cover} alt={song?.title} />
            </div>
            <div className='flex-1 flex flex-col justify-center mx-2 '>
              <p className=' text-md font-bold text-white'>{song?.title}</p>
              <Link to={`/artist/${song?.artist?.id}`}>
                <p className='text-base text-gray-300 mt-1 underline'>{song?.artist?.name}</p>
              </Link>
            </div>
            <div
              onClick={() => {
                setPlaying(true);
                setActiveSong(song);
              }}
            >
              <button className='p-1 bg-secondary-200 rounded-full text-main-200' onClick={handlePlayPause}>
                {activeSong && activeSong.id === song.id && audioRef?.current && !audioRef?.current?.paused ? (
                  <BsPauseFill className='m-auto' />
                ) : (
                  <BsPlayFill className='m-auto' />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-xl'>Top Artists</h2>
          <Link to='/'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4 cursor-grab'
        >
          {topArtists?.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: '25%' }} className=' shadow-lg rounded-full'>
              <Link to={`/artist/${artist.id}`}>
                <img src={artist?.picture} alt='Name' className='rounded-full w-full object-cover' />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='w-full sm:h-24 h-8' />
    </div>
  );
}

export default TopPlay;

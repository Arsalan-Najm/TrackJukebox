import { useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { useParams, Link } from 'react-router-dom';
function AlbumDetail() {
  const { detail, setDetail, activeSong, setPlaying, setActiveSong } = useAppContext();
  const { albumid } = useParams();
  useEffect(() => {
    const getSongDetail = async () => {
      const response = await axios.get(`/api/album/${albumid}`);
      setDetail(response.data);
    };
    getSongDetail();
  }, [albumid]);
  return (
    <div className='flex flex-col'>
      <div className='relative w-full flex flex-col'>
        <div className='w-full bg-gradient-to-l from-transparent to-main-300 sm:h-48 h-24'>
          <div className='absolute inset-0 flex items-center'>
            <img
              src={detail?.cover}
              className='w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover border-2 shadow-xl shadow-main-300 m-2'
            />
            <div className='ml-5'>
              <p className='font-bold sm:text-3xl text-xl text-secondary-100'>{detail?.title}</p>
              <p className='text-base text-secondary-200 mt-px'>
                {detail?.genres?.data?.map((genre) => (
                  <span className='pr-2'>{genre.name}</span>
                ))}
              </p>
              <p className='text-base text-secondary-200 mt-px'>release date: {detail?.release_date}</p>
              <p className='text-base text-secondary-200 mt-px'>duration: {detail?.duration} minutes</p>
              <p className='text-base text-secondary-200 mt-px'>total tracks: {detail?.nb_tracks}</p>
            </div>
          </div>
        </div>
        <div className='w-full sm:h-40 h-12' />
      </div>
      <div className='flex flex-col'>
        <h1 className='font-bold text-xl md:text-3xl text-white'>Tracks List:</h1>
        <div className='mt-6 w-full flex flex-col'>
          {detail?.tracks?.data?.map((song, i) => (
            <Link
              to={`/song/${song.id}`}
              onClick={() => {
                setPlaying(true);
                setActiveSong(song);
              }}
            >
              <div
                className={`w-full flex flex-row items-center hover:bg-main-100 ${
                  activeSong?.title === song?.title ? 'bg-main-100' : 'bg-transparent'
                } py-2 p-4 rounded-lg cursor-pointer mb-2`}
              >
                <h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>
                <div className=' flex flex-col gap-2 '>
                  <img className='w-20 h-20 rounded-lg' src={song?.album?.cover} alt={song?.title} />
                </div>
                <div className='flex-1 flex flex-col justify-center mx-2 max-w-[200px] overflow-hidden md:max-w-full '>
                  <p className=' text-md font-bold truncate text-white '>{song?.title}</p>
                  <p className='text-base  text-gray-300 truncate mt-1'>{song?.album?.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlbumDetail;

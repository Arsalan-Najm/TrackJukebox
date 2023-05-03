import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

function ArtistDetail() {
  const { detail, setDetail, activeSong, setActiveSong, setPlaying } = useAppContext();
  const [artistTracks, setArtistTracks] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getArtist = async () => {
      const response = await axios.get(`/api/artistdetail/${id}`);
      const tracksResponse = await axios.get(`/api/artisttracks/${id}`);
      setDetail(response.data);
      setArtistTracks(tracksResponse.data.data);
    };
    getArtist();
  }, [id]);
  console.log(true);
  return (
    <div className='flex flex-col'>
      <div className='relative w-full flex flex-col'>
        <div className='w-full bg-gradient-to-l from-transparent to-main-300 sm:h-48 h-24'>
          <div className='absolute inset-0 flex items-center'>
            <img
              src={detail?.picture}
              className='w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover border-2 shadow-xl shadow-main-300 m-2'
            />
            <div className='ml-5'>
              <p className='font-bold sm:text-3xl text-xl text-secondary-100'>{detail?.name}</p>
              <p className='text-base text-secondary-200 mt-px'>Total Fans: {detail?.nb_fan}</p>
            </div>
          </div>
        </div>
        <div className='w-full sm:h-40 h-12' />
      </div>
      <div className='flex flex-col'>
        <h1 className='font-bold text-xl md:text-3xl text-white'>Related Songs:</h1>
        <div className='mt-6 w-full flex flex-col'>
          {artistTracks.map((song, i) => (
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

export default ArtistDetail;

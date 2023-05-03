import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

function SongDetail() {
  const { detail, setDetail, lyrics, setLyrics } = useAppContext();
  const { songid } = useParams();
  useEffect(() => {
    const getSongDetail = async () => {
      const response = await axios.get(`/api/track/${songid}`);
      setDetail(response.data);
    };
    getSongDetail();
  }, [songid]);
  useEffect(() => {
    const getLyrics = async () => {
      const response = await axios.get(`/api/lyrics`, {
        params: {
          track: detail?.title,
          artist: detail?.artist?.name,
        },
      });
      setLyrics(response?.data?.message?.body?.lyrics?.lyrics_body);
    };
    getLyrics();
  });
  return (
    <div className='flex flex-col'>
      <div className='relative w-full flex flex-col'>
        <div className='w-full bg-gradient-to-l from-transparent to-main-300 sm:h-48 h-24'>
          <div className='absolute inset-0 flex items-center'>
            <img
              src={detail?.album?.cover}
              className='w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover border-2 shadow-xl shadow-main-300 m-2'
            />
            <div className='ml-5'>
              <p className='font-bold sm:text-3xl text-xl text-secondary-100'>{detail?.title}</p>
              <Link to={`/album/${detail?.album?.id}`}>
                <p className='text-base text-secondary-200 mt-px'>{detail?.album?.title}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full sm:h-40 h-12' />
      </div>
      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>LYRICS:</h2>
        <div className='mt-5'>
          {lyrics ? (
            lyrics.split('\n').map((verse, index) => (
              <p key={index} className='text-gray-400 text-3xl my-1'>
                {verse}
              </p>
            ))
          ) : (
            <h1 className='text-secondary-100 text-2xl'>No Lyrics Available</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongDetail;

import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Search() {
  const [search, setSearch] = useState('');
  const [artist, setArtist] = useState(null);
  const { detail, setDetail, activeSong, setPlaying, setActiveSong } = useAppContext();
  useEffect(() => {
    const getTracks = async () => {
      const response = await axios.get(`/api/search`, {
        params: {
          search,
        },
      });
      setDetail(response?.data?.data);
      setArtist(response?.data?.data[0]?.artist);
    };
    getTracks();
  }, [search]);
  return (
    <div className='fixed top-0 left-0 w-full p-6 h-screen bg-main-200 z-40 overflow-y-auto custom-scrollbar lg:top-auto lg:left-auto  lg:w-1/2 lg:bg-transparent'>
      <h1 className='text-xl md:text-2xl text-secondary-100 mx-1'>Search</h1>
      <input
        type='text'
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full rounded-full p-2 my-4 '
        placeholder='What do you want to listen to?'
      />
      <div className='pt-6'>
        {search ? (
          <Link to={`/artist/${artist?.id}`}>
            <div
              className={`w-full flex flex-row items-center hover:bg-main-100 ${
                activeSong?.title === artist?.name ? 'bg-main-100' : 'bg-transparent'
              } py-2 p-4 rounded-lg cursor-pointer mb-2`}
            >
              <div className=' flex flex-col gap-2 '>
                <img className='w-16 h-16 rounded-full' src={artist?.picture} alt={artist?.title} />
              </div>
              <div className='flex-1 flex flex-col justify-center mx-2 max-w-[200px] overflow-hidden md:max-w-full '>
                <p className=' text-md font-bold truncate text-white '>{artist?.name}</p>
                <p className='text-base  text-gray-300 truncate mt-1'>{artist?.type}</p>
              </div>
            </div>
          </Link>
        ) : null}
        {search &&
          detail?.map((song, i) => (
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
                <div className=' flex flex-col gap-2 '>
                  <img className='w-20 h-20 rounded-lg' src={song?.album?.cover} alt={song?.title} />
                </div>
                <div className='flex-1 flex flex-col justify-center mx-2 max-w-[200px] overflow-hidden md:max-w-full '>
                  <p className=' text-md font-bold truncate text-white '>{song?.title}</p>
                  <p className='text-base  text-gray-300 truncate mt-1'>
                    {song?.type} . {song?.artist?.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Search;

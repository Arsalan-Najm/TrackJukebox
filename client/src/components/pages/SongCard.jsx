import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ScaleLoader } from 'react-spinners';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
function SongCard({ selectedGenreId }) {
  const {
    topTracks,
    setTopTracks,
    loading,
    setLoading,
    activeSong,
    setActiveSong,
    setIndex,
    setPlaying,
    audioRef,
    setCurrentlyPlaying,
  } = useAppContext();
  const getArtists = (genre) => {
    axios.get(`/api/artist/${selectedGenreId}`).then((response) => {
      const artistId = response.data.data.map((artist) => artist.id);
      const tracksResponse = axios.get(`/api/tracks/${artistId}`).then((tracksResponse) => {
        setTopTracks(tracksResponse.data.data);
        setIndex(0);
        setLoading(false);
      });
    });
  };
  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setCurrentlyPlaying(true);
    } else {
      audioRef.current.pause();
      setCurrentlyPlaying(false);
    }
  };

  useEffect(() => {
    if (selectedGenreId !== null) {
      setLoading(true);
      getArtists(selectedGenreId);
    }
  }, [selectedGenreId]);
  return (
    <>
      {loading && <ScaleLoader className=' scale-[1.3] m-auto' color='#F2F2F2' />}{' '}
      {!loading && topTracks.length === 0 && (
        <h1 className='text-secondary-100 text-lg'>No songs found in the database.</h1>
      )}
      {!loading && (
        <>
          {' '}
          {topTracks.map((track) => (
            <div
              className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 rounded-lg cursor-pointer'
              key={track.id}
            >
              <div className='relative w-full h-56 group'>
                <div
                  className={`absolute inset-0 justify-center items-center rounded-lg bg-black bg-opacity-50 group-hover:flex ${
                    activeSong && activeSong.id === track.id ? 'flex bg-black bg-opacity-70' : 'hidden'
                  }`}
                  onClick={() => {
                    setPlaying(true);
                    setActiveSong(track);
                  }}
                >
                  <button
                    className=' w-14 h-14 rounded-full bg-gradient-to-t  from-main-300 to-main-100 text-secondary-100'
                    onClick={togglePlayPause}
                  >
                    {activeSong && activeSong.id === track.id && audioRef?.current && !audioRef?.current?.paused ? (
                      <BsPauseFill className='m-auto' />
                    ) : (
                      <BsPlayFill className='m-auto' />
                    )}
                  </button>
                </div>
                <img src={track.album.cover} className='w-full h-full rounded-lg' />
              </div>
              <div className='mt-4 flex flex-col'>
                <Link to={`/song/${track.id}`}>
                  <p className='font-semibold text-lg truncate text-secondary-100'>{track.title}</p>
                </Link>
                <Link to={`/artist/${track.artist.id}`}>
                  <p className='text-sm truncate text-gray-300 mt-1 underline'>{track.artist.name}</p>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default SongCard;

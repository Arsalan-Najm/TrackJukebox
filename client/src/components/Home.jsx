import axios from 'axios';
import { useEffect, useState } from 'react';
import SongCard from '../components/pages/SongCard';

function Home() {
  const [selectedGenreId, setSelectedGenreId] = useState(0);
  const [selectedGenreName, setSelectedGenreName] = useState('');
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenres = async () => {
      const response = await axios.get(`/api/genre`);
      setGenres(response.data);
    };
    getGenres();
  }, [selectedGenreName]);
  const handleChange = (e) => {
    const genreValue = e.target.value;
    axios.get(`/api/data/${genreValue}`).then((response) => {
      setSelectedGenreId(response.data.id);
      setSelectedGenreName(response.data.name);
    });
  };
  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 '>
        <h1 className='font-bold text-2xl text-secondary-100'>Discover: {selectedGenreName || 'All'}</h1>
        <select
          onChange={handleChange}
          value={selectedGenreId || 'All'}
          className='bg-main-300 p-2 mr-3 text-gray-300 text-sm rounded-lg outline-none sm:mt-0 mt-5'
        >
          {genres?.data?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center flex-wrap sm:justify-start gap-4'>
        <SongCard selectedGenreId={selectedGenreId} />
      </div>
    </div>
  );
}

export default Home;

import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import TopPlay from './components/TopPlay';
import { Home, Search, ArtistDetail, SongDetail, AlbumDetail } from './components/pages';
import Player from './components/Player';

function App() {
  return (
    <div className='App font-main relative flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gradient-to-br from-main-200 to-main-100'>
        <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll custom-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1  pb-40'>
            <Routes>
              <Route path='/' exact element={<Home />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/top-charts' element={<TopPlay />}></Route>
              <Route path='/artist/:id' element={<ArtistDetail />}></Route>
              <Route path='/song/:songid' element={<SongDetail />}></Route>
              <Route path='/album/:albumid' element={<AlbumDetail />}></Route>
            </Routes>
          </div>
          <div className='relative xs:sticky top-0 h-fit'>
            <TopPlay />
          </div>
        </div>
      </div>
      <div className='fixed h-20 lg:h-[5rem] bottom-20 lg:bottom-0 left-0 right-0 flex bg-gradient-to-t z-40  from-main-200 to-main-100'>
        <Player />
      </div>
    </div>
  );
}

export default App;

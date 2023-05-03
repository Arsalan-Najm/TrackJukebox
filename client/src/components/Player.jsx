import {
  BsSkipBackwardFill,
  BsSkipForwardFill,
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsVolumeDownFill,
  BsVolumeUpFill,
  BsVolumeMuteFill,
} from 'react-icons/bs';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
function Player() {
  const {
    topTracks,
    setActiveSong,
    activeSong,
    setCurrentlyPlaying,
    duration,
    audioRef,
    setDuration,
    currentTime,
    setCurrentTime,
    volume,
    setVolume,
    muted,
    setMuted,
  } = useAppContext();
  const playNextSong = () => {
    const currentIndex = topTracks.findIndex((song) => song.id === activeSong.id);
    let nextIndex = (currentIndex + 1) % topTracks.length;
    setActiveSong(topTracks[nextIndex]);
    audioRef.current.src = topTracks[nextIndex]?.preview;
    audioRef.current.play();
  };
  const playPrevSong = () => {
    const currentIndex = topTracks.findIndex((song) => song.id === activeSong.id);
    let prevIndex = (currentIndex - 1) % topTracks.length;
    if (prevIndex < 0) {
      prevIndex = topTracks.length - 1;
    }
    setActiveSong(topTracks[prevIndex]);
    audioRef.current.src = topTracks[prevIndex]?.preview;
    audioRef.current.play();
  };
  const handleSeek = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  const handleInput = (e) => {
    audioRef.current.pause();
    setCurrentlyPlaying(false);
  };
  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setCurrentlyPlaying(true);
    } else {
      audioRef.current.pause();
      setCurrentlyPlaying(false);
    }
  };
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
  };
  return (
    <div className='relative w-full flex justify-between items-center px-8 sm:px-12'>
      <div className='flex-1 flex items-center justify-start'>
        <div className={`hidden sm:block h-14 w-14 mr-4 ${activeSong && audioRef.current ? 'animate-spin-slow' : ''}`}>
          <img src={activeSong ? activeSong?.album?.cover : ''} className='rounded-full' />
        </div>
        <div className='max-w-[200px] md:w-1/2'>
          <Link to={`/song/${activeSong?.id}`}>
            <p className='truncate text-secondary-100 font-bold text-lg'>{activeSong?.title}</p>
          </Link>
          <Link to={`/artist/${activeSong?.artist?.id}`}>
            <p className='truncate text-secondary-200 md:underline'>{activeSong?.artist?.name}</p>
          </Link>
        </div>
      </div>
      <div className='flex-1 flex flex-col items-center md:mt-4 gap-2 justify-center '>
        <div className='flex  items-center justify-center gap-8 md:w-36 lg:w-52 2xl:w-80'>
          {activeSong?.duration && (
            <BsSkipBackwardFill
              onClick={playPrevSong}
              className='scale-[1.4] text-secondary-200 cursor-pointer'
              title='Previous'
            />
          )}
          <button onClick={playPause} className='text-secondary-200 scale-[1.7] hover:scale-[2]'>
            {activeSong && !audioRef?.current?.paused ? (
              <BsPauseCircleFill className=' m-auto' title='Pause' />
            ) : (
              <BsPlayCircleFill className=' m-auto' title='Play' />
            )}
          </button>
          {activeSong?.duration && (
            <BsSkipForwardFill
              onClick={playNextSong}
              className='scale-[1.4] text-secondary-200 cursor-pointer'
              title='Next'
            />
          )}
        </div>

        <div className='hidden sm:flex flex-row items-center'>
          <span className='text-secondary-100'>{`00:${formatTime(Math.floor(currentTime).toFixed() % 30)}`}</span>
          <input
            type='range'
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            onInput={handleInput}
            className='md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg cursor-pointer'
          />
          <audio
            src={activeSong?.preview}
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            volume={volume}
            autoPlay={true}
            onEnded={playNextSong}
          ></audio>
          <span className='text-secondary-100'>0:{duration.toFixed()}</span>
        </div>
      </div>
      <div className='hidden lg:flex flex-1 gap-2 items-center justify-end'>
        <button onClick={toggleMute} className='scale-[1.4] text-secondary-200' title='Mute'>
          {muted || volume === 0 ? <BsVolumeMuteFill /> : volume < 0.5 ? <BsVolumeDownFill /> : <BsVolumeUpFill />}
        </button>
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className='2xl:w-36 md:w-28 h-1 ml-2 cursor-pointer rounded-lg'
        />
      </div>
    </div>
  );
}

export default Player;

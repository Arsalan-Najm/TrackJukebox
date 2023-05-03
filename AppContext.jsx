import { useState, createContext, useContext, useEffect, useRef } from 'react';

const AppContext = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState(false);
  const [index, setIndex] = useState(null);
  const [duration, setDuration] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [detail, setDetail] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const audioRef = useRef();
  return (
    <AppContext.Provider
      value={{
        topTracks,
        setTopTracks,
        loading,
        setLoading,
        audioRef,
        playing,
        setPlaying,
        currentlyPlaying,
        setCurrentlyPlaying,
        activeSong,
        setActiveSong,
        index,
        setIndex,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        volume,
        setVolume,
        muted,
        setMuted,
        detail,
        setDetail,
        lyrics,
        setLyrics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);

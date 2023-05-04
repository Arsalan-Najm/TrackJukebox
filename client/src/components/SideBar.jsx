import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsSearch, BsHouseDoorFill, BsSearchHeartFill } from 'react-icons/bs';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BsMusicNote } from 'react-icons/bs';
const Links = [
  {
    name: 'Home',
    url: '/',
    icon: ({ isActive }) => (isActive ? <BsHouseDoorFill /> : <BsHouseDoor />),
    activeIcon: <BsHouseDoorFill />,
  },
  {
    name: 'Search',
    url: '/search',
    icon: ({ isActive }) => (isActive ? <BsSearchHeartFill /> : <BsSearch />),
    activeIcon: <BsSearchHeartFill />,
  },
];
function Sidebar() {
  const { activeSong } = useAppContext();
  const [activeLink, setActiveLink] = useState(Links[0]);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      <div className='lg:flex hidden flex-col w-[240px] py-10 px-4 bg-main-300'>
        <h1 className='text-secondary-100 black text-2xl'>
          Track
          <BsMusicNote className='inline-block animate-ping' />
          Jukebox
        </h1>
        <div className='mt-10'>
          {Links.map((link) => (
            <NavLink
              key={link.name}
              to={link.url}
              onClick={() => handleLinkClick(link)}
              className={({ isActive }) =>
                isActive ? 'links-style text-secondary-100' : 'links-style text-secondary-200'
              }
            >
              {link.icon({ isActive: activeLink === link })}
              <h1>{link.name}</h1>
            </NavLink>
          ))}
        </div>
        <div className='pt-[8.7rem]'>
          <img
            src={activeSong?.album?.cover || 'https://dummyimage.com/150x150/000/fff&text=No+Image+Available'}
            alt='Song Poster'
            className='absolute left-0  w-60 h-60 p-1 brightness-50'
          />
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 h-14 bg-main-300 z-50 lg:hidden'>
        <ul className='my-2 flex justify-around mx-auto '>
          {Links.map(({ name, url, icon: Icon }) => (
            <li className='text-secondary px-2' key={name}>
              <NavLink to={url}>
                {({ isActive }) => (
                  <div className='flex flex-col gap-2 text-xl text-secondary-100 justify-center items-center'>
                    <Icon isActive={isActive} />
                    <span className='text-xs'>{name}</span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;

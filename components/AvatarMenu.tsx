'use client';
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, User, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AvatarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const defaultAvatarUrl = 'https://via.placeholder.com/150/0000FF/808080?Text=Default+Avatar';

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/sign-in');
  };

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.target instanceof Node &&
      !(event.target as Element).closest(".avatar-menu-content")
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getInitials = (name: string) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // console.log(session);

  return (
    <div className="relative">
      <div onClick={handleAvatarClick} className="cursor-pointer">
        <Avatar className="w-8 h-8">
          <AvatarImage src={defaultAvatarUrl} alt="Avatar" />
          {/* <AvatarImage src={session?.avatarUrl || defaultAvatarUrl} alt="Avatar" /> */}
          <AvatarFallback className="bg-primary text-white">
            {session?.user?.name ? getInitials(session.user.name) : "NA"}
          </AvatarFallback>
        </Avatar>
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10 avatar-menu-content">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex flex-col">
              <p className="font-semibold text-sm text-miniSubheadingColor">{session?.user?.name || 'Ahsan Aasim'}</p>
              <p className="text-twelve text-miniSubheadingColor font-normal">
                {/* {session?.role ? capitalizeFirstLetter(session.role) : 'Admin'} */}
                Admin
              </p>
            </div>
            <span onClick={() => setIsMenuOpen(false)} className="text-black hover:text-black pb-3 cursor-pointer">
              <X size={16} strokeWidth={1} />
            </span>
          </div>
          <ul>
            <li className="px-4 py-2 text-start hover:bg-gray-100 cursor-pointer border-b">
              <div className='flex items-center gap-x-2 cursor-not-allowed text-gray-400 '>
                <span><User size={16} /></span> <span className='text-sm'>My profile</span>
              </div>
            </li>
            <li className="px-4 py-2 text-start hover:bg-gray-100 cursor-pointer">
              <div className='flex items-center gap-x-2' onClick={handleLogout}>
                <span><LogOut size={16} /></span> <span className='text-sm'>Sign out</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
'use client';

import NavLogo from '../public/logo/navLogo.svg';

import {
  BadgeCheck,
  BoxesIcon,
  CircleAlert,
  FileCode,
  FileSymlink,
  FolderKey,
  SquareTerminal,
} from 'lucide-react';


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TeamSwitcher } from './team-switcher';
import { NavMain } from './nav-main';
import { NavAdmin } from './nav-admin';

const defaultData = {
  user: {
    name: 'Khan Atik Faisal',
    email: '',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'DepShield.io',
      logo: NavLogo,
      plan: 'User',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Repositories',
      url: '/repositories',
      icon: FileCode,
    },
    {
      title: 'Vulnerabilities',
      url: '/vulnerabilities',
      icon: CircleAlert,
    },
    {
      title: 'Dependencies',
      url: '/dependencies',
      icon: FileSymlink,
    },
    {
      title: 'Licenses',
      url: '/licenses',
      icon: BadgeCheck,
    },
    {
      title: 'Access Control',
      url: '/access-control',
      icon: FolderKey,
    },
    {
      title: 'Integrations',
      url: '/integrations',
      icon: BoxesIcon,
    },
  ],
};

const isScreenBelowMd = () => {
  return window.matchMedia('(max-width: 768px)').matches;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { toggleSidebar } = useSidebar();
  // console.log("🚀 ~ AppSidebar ~ toggleSidebar:", toggleSidebar)

  useEffect(() => {
    const savedSelectedItem = localStorage.getItem('selectedItem');
    if (savedSelectedItem) {
      setSelectedItem(savedSelectedItem);
    } else {
      setSelectedItem('Dashboard');
    }
  }, []);

  useEffect(() => {
    const matchedItem = defaultData.navMain.find(item => pathname.startsWith(item.url));
    if (matchedItem) {
      setSelectedItem(matchedItem.title);
    }
  }, [pathname]);

  const handleItemClick = (title: string) => {
    setSelectedItem(title);
    localStorage.setItem('selectedItem', title);
    if (isScreenBelowMd()) {
      toggleSidebar();
    }
  };

  const userData = {
    name: session?.data?.user?.name || defaultData.user.name,
    email: session?.data?.user?.email || defaultData.user.email,
    avatar: defaultData.user.avatar,
  };

  const data = {
    ...defaultData,
    user: userData,
  };

  return (
    <Sidebar side='left' variant='sidebar' collapsible='icon' {...props} className='border-none'>
      <SidebarHeader className='bg-[#F1F5F9]'>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className='bg-[#F1F5F9]'>
        <NavMain items={data.navMain} selectedItem={selectedItem} onItemClick={handleItemClick} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
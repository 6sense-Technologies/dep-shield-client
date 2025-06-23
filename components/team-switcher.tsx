'use client';

import * as React from 'react';
import { ChevronsUpDown, X } from 'lucide-react';
import Image from 'next/image';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType | any;
    plan: string;
  }[];
}) {
  const [activeTeam] = React.useState(teams[0]);

  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* <DropdownMenu> */}
        {/* <DropdownMenuTrigger asChild> */}
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-auto'
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-white'>
            {typeof activeTeam.logo != 'string' ? (
              <Image src={activeTeam.logo} alt={`${activeTeam.name} logo`} className='size-8' />
            ) : (
              <activeTeam.logo />
            )}
          </div>
          <div className='grid flex-1 text-left leading-tight'>
            <span className='truncate font-semibold text-sm text-miniSubheadingColor'>
              {activeTeam.name}
            </span>
            <span className='truncate text-tweleve font-normal text-miniSubheadingColor'>{activeTeam.plan}</span>
          </div>
          <X strokeWidth={1} className='ml-auto h-4 w-4 block md:hidden cursor-pointer' onClick={() => toggleSidebar()} />
          {/* <ChevronsUpDown className='ml-auto cursor-not-allowed' /> */}
        </SidebarMenuButton>
        {/* </DropdownMenuTrigger> */}
        {/* <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  {typeof team.logo === 'string' ? (
                    <Image src={team.logo} alt={`${team.name} logo`} width={32} height={32} className='size-4 shrink-0' />
                  ) : (
                    <team.logo className='size-4 shrink-0' />
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent> */}
        {/* </DropdownMenu> */}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
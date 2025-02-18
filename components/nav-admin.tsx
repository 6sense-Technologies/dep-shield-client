'use client';

import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function NavAdmin({
  items,
  selectedItem,
  onItemClick,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  selectedItem: string | null;
  onItemClick: (title: string) => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-sidebarSecondaryColor'>Admin Area</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
              <SidebarMenuButton
                className={cn(
                  'hover:bg-sidebarHoverBg hover:text-black',
                  {
                    'bg-primary text-white hover:bg-primary hover:text-black': selectedItem === item.title,
                    'cursor-pointer text-navbartextColor': item.title === 'Members',
                    'cursor-not-allowed text-gray-400': selectedItem !== item.title && item.title !== 'Members',
                  }
                )}
                tooltip={item.title}
                onClick={() => onItemClick(item.title)}
              >
                {item.icon && (
                  <item.icon
                    className={cn('w-6 h-6', {
                      'text-navbarTextColor': item.title === 'Members',
                      'text-white': selectedItem === item.title,
                      'text-gray-400': selectedItem !== item.title && item.title !== 'Members',
                    })}
                    strokeWidth={2}
                  />
                )}
                <span
                  className={cn('text-sm', {
                    'text-navbarTextColor': item.title === 'Members',
                    'text-white': selectedItem === item.title,
                    'text-gray-400': selectedItem !== item.title && item.title !== 'Members',
                  })}
                >
                  {item.title}
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
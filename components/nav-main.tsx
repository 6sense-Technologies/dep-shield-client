'use client';

import { type LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function NavMain({
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
  const activeItems = ['Dashboard', 'Repositories', 'Vulnerabilities', 'Dependencies', 'Licenses', 'Integrations', 'Access Control'];
  const pathname = usePathname();

  // If the current path is /profile, /profile/edit, or /profile/change-password, set selectedItem to null
  const currentSelectedItem = ['/profile', '/profile/edit', '/profile/change-password'].includes(pathname)
    ? null
    : selectedItem;

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel className='text-sidebarSecondaryColor'>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
              <SidebarMenuButton
                className={cn(
                  'hover:bg-primary hover:text-white',
                  {
                    'bg-primary text-white': currentSelectedItem === item.title,
                    'hover:bg-sidebarHoverBg hover:text-black': currentSelectedItem !== item.title,
                    'cursor-not-allowed text-gray-400': !activeItems.includes(item.title),
                  }
                )}
                tooltip={item.title}
                onClick={() => item.title && onItemClick(item.title)}
              >
                {item.icon && (
                  <item.icon
                    className={cn('w-6 h-6', {
                      'text-white': currentSelectedItem === item.title,
                      'text-navbartextColor': currentSelectedItem !== item.title,
                      'text-gray-400': !activeItems.includes(item.title),
                    })}
                    strokeWidth={2}
                  />
                )}
                <span
                  className={cn('text-sm', {
                    'text-white': currentSelectedItem === item.title,
                    'text-navbartextColor': currentSelectedItem !== item.title,
                    'text-gray-400': !activeItems.includes(item.title),
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
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Megaphone,
  Music2,
  Mic,
  Brush,
  Wrench,
  Users,
  Palette,
  Scissors,
  Radio,
  Shield,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

const wingNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/dashboard/suggestions', label: 'Suggestions', icon: Music2 },
];

const memberNavItems = [
  { href: '/dashboard/broadcasting', label: 'Broadcasting', icon: Radio },
  { href: '/dashboard/creative', label: 'Creative', icon: Brush },
  { href: '/dashboard/designing', label: 'Designing', icon: Palette },
  { href: '/dashboard/pr', label: 'PR', icon: Users },
  { href: '/dashboard/technical', label: 'Technical', icon: Wrench },
  { href: '/dashboard/video-editing', label: 'Video Editing', icon: Scissors },
];

const adminNavItems = [
  { href: '/dashboard/admin', label: 'Admin Panel', icon: Shield },
];

export function MainNav() {
  const pathname = usePathname();

  const renderNavItems = (items: typeof wingNavItems) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.label}>
        <Link href={item.href} legacyBehavior passHref>
          <SidebarMenuButton
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    ));
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          {renderNavItems(wingNavItems)}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Wings</SidebarGroupLabel>
        <SidebarMenu>
          {renderNavItems(memberNavItems)}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarMenu>
          {renderNavItems(adminNavItems)}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

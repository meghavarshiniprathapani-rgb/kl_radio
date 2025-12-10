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
  Upload,
  BookText,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-context';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: string[];
};

const navItems: NavItem[] = [
  // General
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid, roles: ['Station Head', 'Creative', 'Technical', 'PR', 'Design', 'Video', 'RJ', 'Broadcasting', 'Designing', 'Video Editing'] },
  { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone, roles: ['Station Head', 'PR'] },
  { href: '/dashboard/suggestions', label: 'Suggestions', icon: Music2, roles: ['Station Head', 'RJ'] },
  { href: '/dashboard/rj-wing', label: 'RJ Wing', icon: BookText, roles: ['Station Head', 'RJ'] },
  
  // Wings
  { href: '/dashboard/broadcasting', label: 'Broadcasting', icon: Radio, roles: ['Station Head', 'RJ', 'Technical', 'Broadcasting'] },
  { href: '/dashboard/creative', label: 'Creative', icon: Brush, roles: ['Station Head', 'Creative'] },
  { href: '/dashboard/designing', label: 'Designing', icon: Palette, roles: ['Station Head', 'Design', 'Designing'] },
  { href: '/dashboard/pr', label: 'PR', icon: Users, roles: ['Station Head', 'PR'] },
  { href: '/dashboard/technical', label: 'Technical', icon: Wrench, roles: ['Station Head', 'Technical'] },
  { href: '/dashboard/video-editing', label: 'Video Editing', icon: Scissors, roles: ['Station Head', 'Video', 'Video Editing'] },
  { href: '/dashboard/uploads', label: 'Uploads', icon: Upload, roles: ['Station Head', 'PR', 'Design', 'Video', 'Designing', 'Video Editing'] },

  // Management
  { href: '/dashboard/admin', label: 'Admin Panel', icon: Shield, roles: ['Station Head'] },
];


const groupMapping: Record<string, string> = {
  'Dashboard': 'Menu',
  'Announcements': 'Menu',
  'Suggestions': 'Menu',
  'RJ Wing': 'Menu',
  'Broadcasting': 'Wings',
  'Creative': 'Wings',
  'Designing': 'Wings',
  'PR': 'Wings',
  'Technical': 'Wings',
  'Video Editing': 'Wings',
  'Uploads': 'Wings',
  'Admin Panel': 'Management',
}

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const userRole = user?.role || 'Guest';

  const accessibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  const groupedNavItems = accessibleNavItems.reduce((acc, item) => {
    const group = groupMapping[item.label] || 'Menu';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, typeof accessibleNavItems>);


  const renderNavItems = (items: typeof accessibleNavItems) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.label}>
        <SidebarMenuButton
          asChild
          isActive={pathname === item.href}
          tooltip={item.label}
        >
          <Link href={item.href}>
            <item.icon />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  return (
    <>
      {Object.entries(groupedNavItems).map(([group, items]) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel>{group}</SidebarGroupLabel>
          <SidebarMenu>
            {renderNavItems(items)}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

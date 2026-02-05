'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/types';


type NavItem = {
  href: string;
  label: string;
  roles: UserRole[];
};

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', roles: ['station_head', 'creative', 'technical', 'pr', 'rj', 'broadcasting', 'designing', 'video_editing'] },
  { href: '/dashboard/announcements', label: 'Announcements', roles: ['pr', 'creative'] },
  { href: '/dashboard/suggestions', label: 'Suggestions', roles: ['rj'] },
  { href: '/dashboard/rj-wing', label: 'RJ Wing', roles: ['rj'] },
  { href: '/dashboard/broadcasting', label: 'Broadcasting', roles: ['broadcasting'] },
  { href: '/dashboard/creative', label: 'Creative', roles: ['creative'] },
  { href: '/dashboard/designing', label: 'Designing', roles: ['designing'] },
  { href: '/dashboard/pr', label: 'PR', roles: ['pr'] },
  { href: '/dashboard/technical', label: 'Technical', roles: ['technical'] },
  { href: '/dashboard/video-editing', label: 'Video Editing', roles: ['video_editing'] },
  { href: '/dashboard/uploads', label: 'Uploads', roles: ['pr', 'designing', 'video_editing'] },
  { href: '/dashboard/admin', label: 'Admin Panel', roles: ['station_head'] },
];

export function MainNav({ isMobile = false, onNavigate }: { isMobile?: boolean, onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userRole = user?.role || 'guest';

  const accessibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  if (isMobile) {
    return (
      <>
        {accessibleNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
                "text-muted-foreground hover:text-foreground",
                pathname === item.href && "text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {accessibleNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm text-muted-foreground transition-colors hover:text-foreground",
            pathname === item.href && "text-foreground font-semibold"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
  roles: string[];
};

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', roles: ['Station Head', 'Creative', 'Technical', 'PR', 'Design', 'Video', 'RJ', 'Broadcasting', 'Designing', 'Video Editing'] },
  { href: '/dashboard/announcements', label: 'Announcements', roles: ['Station Head', 'PR'] },
  { href: '/dashboard/suggestions', label: 'Suggestions', roles: ['Station Head', 'RJ'] },
  { href: '/dashboard/rj-wing', label: 'RJ Wing', roles: ['Station Head', 'RJ'] },
  { href: '/dashboard/broadcasting', label: 'Broadcasting', roles: ['Station Head', 'RJ', 'Technical', 'Broadcasting'] },
  { href: '/dashboard/creative', label: 'Creative', roles: ['Station Head', 'Creative'] },
  { href: '/dashboard/designing', label: 'Designing', roles: ['Station Head', 'Design', 'Designing'] },
  { href: '/dashboard/pr', label: 'PR', roles: ['Station Head', 'PR'] },
  { href: '/dashboard/technical', label: 'Technical', roles: ['Station Head', 'Technical'] },
  { href: '/dashboard/video-editing', label: 'Video Editing', roles: ['Station Head', 'Video', 'Video Editing'] },
  { href: '/dashboard/uploads', label: 'Uploads', roles: ['Station Head', 'PR', 'Design', 'Video', 'Designing', 'Video Editing'] },
  { href: '/dashboard/admin', label: 'Admin Panel', roles: ['Station Head'] },
];

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userRole = user?.role || 'Guest';

  const accessibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  if (isMobile) {
    return (
      <>
        {accessibleNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === item.href && "text-foreground font-semibold"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

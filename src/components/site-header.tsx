import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Radio } from 'lucide-react';
import Image from 'next/image';

export function SiteHeader() {
  const navItems = [
    { href: '#listen-live', label: 'Listen Live' },
    { href: '#announcements', label: 'Announcements' },
    { href_id: '#suggestions', label: 'Suggestions' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Image src="https://ik.imagekit.io/bhanuteja110/image.png" alt="KL Radio Logo" width={160} height={160} className="h-40 w-40 rounded-full" />
          <span className="font-bold sm:inline-block text-2xl">KL Radio</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
            <Link href="#announcements" className="text-muted-foreground transition-colors hover:text-foreground">Announcements</Link>
            <Link href="#suggestions" className="text-muted-foreground transition-colors hover:text-foreground">Suggestions</Link>
          </nav>
          <nav className="flex items-center space-x-1">
              <Button asChild>
                <Link href="/login">Member Login</Link>
              </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Radio } from 'lucide-react';

export function SiteHeader() {
  const navItems = [
    { href: '#listen-live', label: 'Listen Live' },
    { href: '#announcements', label: 'Announcements' },
    { href_id: '#suggestions', label: 'Suggestions' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Radio className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">KL Radio Hub</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link href="#announcements" className="text-muted-foreground transition-colors hover:text-foreground">Announcements</Link>
          <Link href="#suggestions" className="text-muted-foreground transition-colors hover:text-foreground">Suggestions</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
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

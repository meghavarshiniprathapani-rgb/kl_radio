'use client';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { Button } from '../ui/button';
import { LogOut, PanelLeft } from 'lucide-react';
import { UserNav } from './user-nav';
import { MainNav } from './main-nav';
import { useAuth } from '@/context/auth-context';

export function DashboardHeader() {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-24 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src="https://ik.imagekit.io/bhanuteja110/image.png" alt="KL Radio Logo" width={120} height={120} className="h-32 w-32 rounded-full" />
          <span className="sr-only">KL Radio</span>
        </Link>
        <MainNav />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
                <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                >
                <Image src="https://ik.imagekit.io/bhanuteja110/image.png" alt="KL Radio Logo" width={120} height={120} className="h-32 w-32 rounded-full" />
                <span>KL Radio</span>
                </Link>
            </SheetTitle>
            <SheetDescription>
                Navigate through your dashboard sections.
            </SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-6 text-lg font-medium mt-4">
            <MainNav isMobile={true} />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
         <div className="relative ml-auto flex flex-1 items-center justify-end gap-2 md:grow-0">
            <UserNav />
            <Button variant="ghost" size="icon" onClick={() => logout()}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
         </div>
      </div>
    </header>
  );
}

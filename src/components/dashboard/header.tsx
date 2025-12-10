'use client';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
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
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src="https://ik.imagekit.io/z5fowzj2wr/Screenshot%202025-12-10%20171402.png?updatedAt=1765367128945" alt="KL Radio Logo" width={28} height={28} className="h-7 w-7" />
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
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src="https://ik.imagekit.io/z5fowzj2wr/Screenshot%202025-12-10%20171402.png?updatedAt=1765367128945" alt="KL Radio Logo" width={28} height={28} className="h-7 w-7" />
              <span className="sr-only">KL Radio</span>
            </Link>
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

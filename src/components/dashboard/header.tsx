'use client';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { Button } from '../ui/button';
import { LogOut, PanelLeft, Menu, X } from 'lucide-react';
import { UserNav } from './user-nav';
import { MainNav } from './main-nav';
import { useAuth } from '@/context/auth-context';
import { useState, useCallback } from 'react';

export function DashboardHeader() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(!open), [open]);

  return (
    <>
    <div className="fixed top-0 left-0 w-full h-24 flex justify-center items-center z-50 pointer-events-none">
      <header className="w-full max-w-7xl bg-white/10 backdrop-blur-lg text-white flex justify-center px-4 py-3 z-50 rounded-full shadow-lg pointer-events-auto">
        <div className="flex items-center justify-between w-full">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="https://ik.imagekit.io/bhanuteja110/image.png"
              alt="KL Radio Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-lg font-semibold text-white">KL Radio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <MainNav />
          </nav>
          
          <div className="hidden md:flex items-center gap-2">
            <UserNav />
            <Button variant="ghost" size="icon" onClick={() => logout()}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
          

          <button
            className="md:hidden block"
            onClick={toggle}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>
    </div>
      {open && (
        <div
          className="fixed inset-0 bg-black text-white pt-24 px-6 z-40 md:hidden"
        >
          <button
            className="absolute top-6 right-6 p-2"
            onClick={toggle}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex flex-col space-y-6 text-lg">
            <MainNav isMobile={true} onNavigate={toggle} />

            <Button
                variant="destructive"
                className="mt-4 w-full text-center py-3 bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => {
                    toggle();
                    logout();
                }}
              >
                Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

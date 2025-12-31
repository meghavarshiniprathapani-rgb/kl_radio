
'use client';

import { AuthProvider, useAuth } from '@/context/auth-context';
import { DashboardHeader } from '@/components/dashboard/header';
import { ReactNode } from 'react';

function DashboardContent({ children }: { children: ReactNode }) {
  const { loading, user } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="text-2xl font-semibold">Loading your dashboard...</div>
        <p className="text-muted-foreground">Please wait while we verify your session.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 pt-28 md:gap-8 md:p-8 md:pt-32">
        {children}
      </main>
    </div>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}

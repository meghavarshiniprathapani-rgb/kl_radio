'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { ArrowRight } from 'lucide-react';

function WelcomeComponent() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If no user is logged in, redirect to login page
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Welcome, {user.role}!</CardTitle>
          <CardDescription>You have successfully logged in.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            You are logged in as {user.name}.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function WelcomePage() {
    return (
        <AuthProvider>
            <WelcomeComponent />
        </AuthProvider>
    )
}

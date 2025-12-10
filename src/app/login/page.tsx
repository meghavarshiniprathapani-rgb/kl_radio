'use client';

import Link from 'next/link';
import { Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle authentication here.
    // For now, we'll just redirect to the dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2 text-primary">
        <Radio className="h-8 w-8" />
        <span className="font-headline text-3xl font-bold">KL Radio Hub</span>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Member Login</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@klradio.com"
                required
                defaultValue="station.head@klradio.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Not a member? Go back to the{' '}
        <Link href="/" className="underline underline-offset-4 hover:text-primary">
          main site
        </Link>
        .
      </p>
    </div>
  );
}

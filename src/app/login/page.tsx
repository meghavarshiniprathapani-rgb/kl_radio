'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { AuthProvider, useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { NavbarKL } from '@/components/ui/navbar-kl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function LoginComponent() {
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !role) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please enter username, password, and select a role.',
      });
      return;
    }

    const result = await login(username, password, role);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.error,
      });
    }
    // On success, the context handles redirection.
  };

  return (
    <>
    <NavbarKL />
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-4 text-primary">
        <Image src="https://ik.imagekit.io/bhanuteja110/image.png" alt="KL Radio Logo" width={160} height={160} className="h-40 w-40 rounded-full" />
        <span className="font-headline text-6xl font-bold">KL Radio</span>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Member Login</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
               <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="password">Password</Label>
               <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Station Head">Station Head</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="PR">PR</SelectItem>
                  <SelectItem value="Designing">Designing</SelectItem>
                  <SelectItem value="Video Editing">Video Editing</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="Broadcasting">Broadcasting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
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
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  );
}

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NavbarKL } from '@/components/ui/navbar-kl';


function LoginComponent() {
  const router = useRouter();
  const { users, login, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    if (!selectedRole || !username || !password) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please fill in all fields.',
      });
      setFormLoading(false);
      return;
    }

    const result = await login(selectedRole, username, password);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.error,
      });
    }
    // On success, the context handles redirection.

    setFormLoading(false);
  };
  
  const uniqueRoles = Array.from(new Set(users.map(u => u.role))).filter(role => role !== 'Guest');

  const isLoading = formLoading || authLoading;

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
          <CardDescription>Select your role and enter your credentials.</CardDescription>
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
                <Label htmlFor="role">Select Your Role</Label>
                <Select onValueChange={setSelectedRole} value={selectedRole}>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Login as..." />
                    </SelectTrigger>
                    <SelectContent>
                        {uniqueRoles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
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

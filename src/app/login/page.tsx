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


function LoginComponent() {
  const router = useRouter();
  const { users, login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password is for UI purposes for now
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email || !password || !selectedRole) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please select a role and enter your credentials.',
      });
      setLoading(false);
      return;
    }

    const selectedUser = users.find(u => u.role === selectedRole);
    if (!selectedUser) {
        toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'Invalid role selected.',
        });
        setLoading(false);
        return;
    }

    // In a real app, you'd verify email and password against the selected role's user.
    // For now, we're just matching the selected role and a mock user.
    const result = await login(selectedUser.email);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.error,
      });
    }
    // On success, the context handles redirection.

    setLoading(false);
  };
  
  const uniqueRoles = Array.from(new Set(users.map(u => u.role))).filter(role => role !== 'Guest');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2 text-primary">
        <Image src="https://ik.imagekit.io/z5fowzj2wr/Screenshot%202025-12-10%20171402.png?updatedAt=1765367128945" alt="KL Radio Logo" width={32} height={32} className="h-8 w-8" />
        <span className="font-headline text-3xl font-bold">KL Radio</span>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Member Login</CardTitle>
          <CardDescription>Select your role and enter your credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
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
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
               <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="password">Password</Label>
               <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
  );
}


export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  );
}

'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Station Head' | 'Creative' | 'Technical' | 'PR' | 'Design' | 'Video' | 'RJ' | 'Guest' | 'Broadcasting' | 'Designing' | 'Video Editing';
  avatarId: string;
};

const users: User[] = [
  { id: '1', name: 'Station Head', email: 'station.head@klradio.com', role: 'Station Head', avatarId: '1' },
  { id: '2', name: 'RJ Riff', email: 'rj.riff@klradio.com', role: 'RJ', avatarId: '1' },
  { id: '3', name: 'Creative Carla', email: 'carla.c@klradio.com', role: 'Creative', avatarId: '1' },
  { id: '4', name: 'Techie Tom', email: 'tom.t@klradio.com', role: 'Technical', avatarId: '1' },
  { id: '5', name: 'PR Penelope', email: 'penelope.p@klradio.com', role: 'PR', avatarId: '1' },
  { id: '6', name: 'Designer Dan', email: 'dan.d@klradio.com', role: 'Designing', avatarId: '1' },
  { id: '7', name: 'Video Vince', email: 'vince.v@klradio.com', role: 'Video Editing', avatarId: '1' },
  { id: '8', name: 'Broadcast Barry', email: 'barry.b@klradio.com', role: 'Broadcasting', avatarId: '1' },
];

type AuthContextType = {
  user: User | null;
  users: User[];
  login: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    // Mock login logic. In a real app, this would involve a password and an API call.
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase() || users.find(u2 => u2.role === u.role));
    
    if (email) { // This will be improved when Firebase is connected
      const userToLogin = users.find(u => u.email === email) || users.find(u => u.role === email);
      if (userToLogin) {
        setUser(userToLogin);
        router.push('/dashboard');
        return { success: true };
      }
    }
    
    if (foundUser) {
      setUser(foundUser);
      router.push('/dashboard');
      return { success: true };
    } else {
      return { success: false, error: 'No user found with that email.' };
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, users, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

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
  { id: '1', name: 'Station Head', email: 'stationhead@gmail.com', role: 'Station Head', avatarId: '1' },
  { id: '2', name: 'RJ Riff', email: 'rj@gmail.com', role: 'RJ', avatarId: '1' },
  { id: '3', name: 'Creative Carla', email: 'creative@gmail.com', role: 'Creative', avatarId: '1' },
  { id: '4', name: 'Techie Tom', email: 'technical@gmail.com', role: 'Technical', avatarId: '1' },
  { id: '5', name: 'PR Penelope', email: 'pr@gmail.com', role: 'PR', avatarId: '1' },
  { id: '6', name: 'Designer Dan', email: 'designing@gmail.com', role: 'Designing', avatarId: '1' },
  { id: '7', name: 'Video Vince', email: 'videoediting@gmail.com', role: 'Video Editing', avatarId: '1' },
  { id: '8', name: 'Broadcast Barry', email: 'broadcasting@gmail.com', role: 'Broadcasting', avatarId: '1' },
];

const roleRedirects: Record<string, string> = {
  'Station Head': '/dashboard',
  'RJ': '/dashboard/rj-wing',
  'Creative': '/dashboard/creative',
  'Technical': '/dashboard/technical',
  'PR': '/dashboard/pr',
  'Designing': '/dashboard/designing',
  'Video Editing': '/dashboard/video-editing',
  'Broadcasting': '/dashboard/broadcasting',
};


type AuthContextType = {
  user: User | null;
  users: User[];
  login: (role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = useCallback(async (roleToFind: string): Promise<{ success: boolean; error?: string }> => {
    const foundUser = users.find((u) => u.role === roleToFind);
    
    if (foundUser) {
      setUser(foundUser);
      const redirectPath = roleRedirects[foundUser.role] || '/dashboard';
      router.push(redirectPath);
      return { success: true };
    } else {
      return { success: false, error: 'No user found for that role.' };
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

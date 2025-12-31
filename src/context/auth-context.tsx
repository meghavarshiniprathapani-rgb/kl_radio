'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { SongSuggestion } from '@/lib/types';
import api, { setAuthToken } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Station Head' | 'Creative' | 'Technical' | 'PR' | 'RJ' | 'Broadcasting' | 'Designing' | 'Video Editing' | 'Guest';
  avatarId: string;
};

const mockUsers: User[] = [
  { id: '1', name: 'Station Head', email: 'stationhead@gmail.com', role: 'Station Head', avatarId: '1' },
  { id: '2', name: 'RJ Riff', email: 'rj@gmail.com', role: 'RJ', avatarId: '1' },
  { id: '3', name: 'Creative Carla', email: 'creative@gmail.com', role: 'Creative', avatarId: '1' },
  { id: '4', name: 'Techie Tom', email: 'technical@gmail.com', role: 'Technical', avatarId: '1' },
  { id: '5', name: 'PR Penelope', email: 'pr@gmail.com', role: 'PR', avatarId: '1' },
  { id: '6', name: 'Designer Dan', email: 'designing@gmail.com', role: 'Designing', avatarId: '1' },
  { id: '7', 'name': 'Video Vince', email: 'videoediting@gmail.com', role: 'Video Editing', avatarId: '1' },
  { id: '8', name: 'Broadcast Barry', email: 'broadcasting@gmail.com', role: 'Broadcasting', avatarId: '1' },
];

const roleRedirects: Record<string, string> = {
  'station_head': '/dashboard',
  'rj': '/dashboard/rj-wing',
  'creative': '/dashboard/creative',
  'technical': '/dashboard/technical',
  'pr': '/dashboard/pr',
  'designing': '/dashboard/designing',
  'video_editing': '/dashboard/video-editing',
  'broadcasting': '/dashboard/broadcasting',
};

// Frontend roles to backend roles mapping
const roleMapping: { [key: string]: string } = {
  'Station Head': 'station_head',
  'Creative': 'creative',
  'Technical': 'technical',
  'PR': 'pr',
  'RJ': 'rj',
  'Broadcasting': 'broadcasting',
  'Designing': 'designing',
  'Video Editing': 'video_editing',
};


type AssignedNewsItem = {
    id: string;
    title: string;
    summary: string;
    source: string;
}

type AuthContextType = {
  user: User | null;
  users: User[];
  loading: boolean;
  login: (role: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User | null) => void;
  assignedNews: AssignedNewsItem[];
  setAssignedNews: (news: AssignedNewsItem[]) => void;
  songSuggestions: SongSuggestion[];
  addSongSuggestion: (suggestion: Omit<SongSuggestion, 'id' | 'submittedAt' | 'status' | 'artist'>) => void;
  setSongSuggestions: (suggestions: SongSuggestion[]) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [assignedNews, setAssignedNews] = useState<AssignedNewsItem[]>([]);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLoginSuccess = useCallback((userData: User, token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser(userData);
    const redirectPath = roleRedirects[userData.role] || '/dashboard';
    router.push(redirectPath);
  }, [router]);
  
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const response = await api.get('/auth/me');
          if (response.data) {
            setUser(response.data.user);
            const currentPath = pathname;
            const isAuthPage = currentPath === '/login';
            if (isAuthPage) {
              const redirectPath = roleRedirects[response.data.user.role] || '/dashboard';
              router.push(redirectPath);
            }
          } else {
            localStorage.removeItem('token');
            setAuthToken(null);
            if (!['/', '/login'].includes(pathname)) {
              router.push('/login');
            }
          }
        } catch (error) {
          console.error('Session verification failed', error);
          localStorage.removeItem('token');
          setAuthToken(null);
          if (!['/', '/login'].includes(pathname)) {
            router.push('/login');
          }
        }
      } else {
        const isDashboard = pathname.startsWith('/dashboard');
        if (isDashboard) {
            router.push('/login');
        }
      }
      
      setLoading(false);
    };
    initializeApp();
  }, [pathname, router]);
  
  const login = useCallback(async (role: string, username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const backendRole = roleMapping[role] || role;
    try {
      const response = await api.post('/auth/login', { username, role: backendRole, password }); 
      const { user: userData, token } = response.data;
      handleLoginSuccess(userData, token);
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  }, [handleLoginSuccess]);
  
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    setAuthToken(null);
    router.push('/login');
  }, [router]);
  
  const addSongSuggestion = useCallback(async (suggestion: Omit<SongSuggestion, 'id' | 'submittedAt' | 'status'>) => {
     try {
      const response = await api.post('/public/song-suggestion', suggestion);
      // Assuming the backend returns the newly created suggestion
      setSongSuggestions(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Failed to submit song suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Could not submit your song suggestion. Please try again later.',
      });
    }
  }, [toast]);

  return (
    <AuthContext.Provider value={{ 
        user, 
        users: mockUsers, 
        loading,
        login, 
        logout, 
        setUser, 
        assignedNews, 
        setAssignedNews,
        songSuggestions,
        addSongSuggestion,
        setSongSuggestions
    }}>
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

'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { SongSuggestion } from '@/lib/types';
import { api } from '@/lib/api';

type User = {
  id: string;
  name: string;
  username: string;
  role: 'Station Head' | 'Creative' | 'Technical' | 'PR' | 'Design' | 'Video' | 'RJ' | 'Guest' | 'Broadcasting' | 'Designing' | 'Video Editing';
  avatarId: string;
};

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

type AssignedNewsItem = {
    id: string;
    title: string;
    summary: string;
    source: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
  songSuggestions: SongSuggestion[];
  addSongSuggestion: (suggestion: Omit<SongSuggestion, 'id' | 'submittedAt' | 'status'>) => void;
  setSongSuggestions: (suggestions: SongSuggestion[]) => void;
  assignedNews: AssignedNewsItem[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const [assignedNews, setAssignedNews] = useState<AssignedNewsItem[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const verifyUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); 
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse token or fetch user", error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const fetchAssignedNews = useCallback(async () => {
    if (user?.role === 'RJ' || user?.role === 'Station Head') {
      try {
        const response = await api.get('/rj/news');
        setAssignedNews(response.data);
      } catch (error) {
        console.error("Failed to fetch assigned news", error);
      }
    }
  }, [user]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (user) {
        fetchAssignedNews();
    }
  }, [user, fetchAssignedNews]);

  const login = async (username: string, password: string, role: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password, role });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser(userData);

      const redirectPath = roleRedirects[userData.role] || '/dashboard';
      router.push(redirectPath);
      setLoading(false);
      return { success: true };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setAssignedNews([]);
    localStorage.removeItem('token');
    router.push('/login');
  }, [router]);
  
  const addSongSuggestion = useCallback(async (suggestion: Omit<SongSuggestion, 'id' | 'submittedAt' | 'status'>) => {
    try {
        const newSuggestion = await api.post('/public/song-suggestion', suggestion);
        setSongSuggestions(prev => [newSuggestion.data, ...prev]);
    } catch (error) {
        console.error("Failed to add song suggestion", error);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user && !['/login', '/'].includes(pathname) && !pathname.startsWith('/_next')) {
        router.push('/login');
    }
  }, [user, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ 
        user, 
        isAuthenticated: !!user,
        login, 
        logout, 
        loading,
        songSuggestions,
        addSongSuggestion,
        setSongSuggestions,
        assignedNews
    }}>
      {loading ? (
          <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : children}
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

'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { SongSuggestion, User, UserRole } from '@/lib/types';
import api, { setAuthToken } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const roleRedirects: { [key in UserRole]?: string } = {
  'station_head': '/dashboard',
  'rj': '/dashboard/rj-wing',
  'creative': '/dashboard/creative',
  'technical': '/dashboard/technical',
  'pr': '/dashboard/pr',
  'designing': '/dashboard/designing',
  'video_editing': '/dashboard/video-editing',
  'broadcasting': '/dashboard/broadcasting',
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (role: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  songSuggestions: SongSuggestion[];
  addSongSuggestion: (suggestion: Omit<SongSuggestion, 'id' | 'submittedAt' | 'status'>) => Promise<{ success: boolean }>;
  setSongSuggestions: (suggestions: SongSuggestion[]) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  const verifyAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    const isAuthPage = pathname === '/login';
    const publicPages = ['/', '/events', '/our-team'];
    const isPublicPage = publicPages.includes(pathname);

    if (!token) {
        if (!isPublicPage && !isAuthPage) {
            router.replace('/login');
        }
        setLoading(false);
        return;
    }

    setAuthToken(token);
    try {
        const response = await api.get('/auth/me');
        if (response.data && response.data.user) {
            const userData = response.data.user;
            const apiUser: User = {
                id: userData.id,
                name: userData.name,
                username: userData.username,
                role: userData.role,
                avatarId: userData.avatarId || '1',
            };
            setUser(apiUser);
            if (isAuthPage) {
                const redirectPath = roleRedirects[apiUser.role] || '/dashboard';
                router.replace(redirectPath);
            }
        } else {
            throw new Error('Invalid session');
        }
    } catch (error) {
        console.error('Session verification failed', error);
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
        if (!isPublicPage && !isAuthPage) {
            router.replace('/login');
        }
    } finally {
        setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  
  const login = useCallback(async (role: string, username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, role, password });
      const { user: userData, token } = response.data;

      localStorage.setItem('token', token);
      setAuthToken(token);

      // We don't set the user here. We redirect and let verifyAuth handle it on the new page.
      // This ensures the user state is fresh and verified from the token, preventing race conditions.
      const redirectPath = roleRedirects[userData.role as UserRole] || '/dashboard';
      router.replace(redirectPath);
      
      // setLoading is not set to false here because the page is changing.
      // verifyAuth will handle the loading state on the destination page.
      return { success: true };
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  }, [router]);
  
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    setAuthToken(null);
    router.push('/login');
  }, [router]);
  
  const addSongSuggestion = useCallback(async (suggestion: Omit<SongSuggestion, 'id' | 'submittedAt' | 'status'>) : Promise<{ success: boolean }> => {
     try {
      const response = await api.post('/public/song-suggestion', suggestion);
      setSongSuggestions(prev => [response.data, ...prev]);
      return { success: true };
    } catch (error: any) {
      console.error('Failed to submit song suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.response?.data?.message || 'Could not submit your song suggestion. Please try again later.',
      });
      return { success: false };
    }
  }, [toast]);

  return (
    <AuthContext.Provider value={{ 
        user,
        loading,
        login, 
        logout, 
        songSuggestions,
        addSongSuggestion,
        setSongSuggestions,
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

    
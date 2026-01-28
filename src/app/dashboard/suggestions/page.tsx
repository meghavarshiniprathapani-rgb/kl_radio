'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { SuggestionsTable } from "./components/suggestions-table";
import { useState, useEffect } from "react";
import type { SongSuggestion } from "@/lib/types";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function SuggestionsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'Technical' || user?.role === 'Station Head') {
      const fetchSuggestions = async () => {
        try {
          setLoading(true);
          const response = await api.get('/api/technical/song-suggestions');
          setSuggestions(response.data);
        } catch (error) {
          console.error("Failed to fetch song suggestions:", error);
          toast({
            variant: "destructive",
            title: "Fetch Error",
            description: "Could not load song suggestions.",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchSuggestions();
    }
  }, [user, toast]);

  const handleSetSuggestions = async (newSuggestions: SongSuggestion[]) => {
    // This function can be used to update state, and potentially sync with backend
    // For now, it just updates the local state.
    // If we need to reflect deletions, we can call the API here.
    setSuggestions(newSuggestions);
  }
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Song Suggestions</h1>
          <p className="text-muted-foreground">Review and manage song requests from listeners.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Incoming Requests</CardTitle>
            <CardDescription>A list of song suggestions submitted by your listeners.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center p-8">Loading suggestions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Song Suggestions
        </h1>
        <p className="text-muted-foreground">
          Review and manage song requests from listeners.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Incoming Requests</CardTitle>
            <CardDescription>A list of song suggestions submitted by your listeners.</CardDescription>
        </CardHeader>
        <CardContent>
           {suggestions.length > 0 ? (
              <SuggestionsTable suggestions={suggestions} setSuggestions={handleSetSuggestions} />
           ) : (
             <p className="text-sm text-muted-foreground text-center p-8">
               No song suggestions have been submitted yet.
             </p>
           )}
        </CardContent>
      </Card>

    </div>
  )
}

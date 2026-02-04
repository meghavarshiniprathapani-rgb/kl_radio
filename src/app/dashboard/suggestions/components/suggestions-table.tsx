'use client';

import type { SongSuggestion } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { useCallback } from 'react';

interface SuggestionsTableProps {
  suggestions: SongSuggestion[];
  setSuggestions: (suggestions: SongSuggestion[]) => void;
}

export function SuggestionsTable({ suggestions, setSuggestions }: SuggestionsTableProps) {
  const { toast } = useToast();

  const handleStatusChange = useCallback((id: string, newStatus: SongSuggestion['status']) => {
    // This is a local update for immediate UI feedback.
    // The backend doesn't support status updates, only deletion.
    setSuggestions(
      suggestions.map(suggestion =>
        suggestion.id === id ? { ...suggestion, status: newStatus } : suggestion
      )
    );
    toast({
      title: 'Status Updated (Local)',
      description: `Song suggestion status changed to ${newStatus}. This is a local-only change.`,
    });
  }, [suggestions, setSuggestions, toast]);

  const handleDeleteSuggestion = useCallback(async (id: string) => {
    const originalSuggestions = [...suggestions];
    setSuggestions(suggestions.filter(s => s.id !== id));

    try {
      await api.delete(`/api/technical/song-suggestions/${id}`);
      toast({
        title: 'Suggestion Deleted',
        description: 'The song suggestion has been removed.',
      });
    } catch (error) {
      console.error('Failed to delete suggestion', error);
      setSuggestions(originalSuggestions);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete the suggestion.',
      });
    }
  }, [suggestions, setSuggestions, toast]);

  const togglePlayedStatus = useCallback((id: string, currentStatus: SongSuggestion['status']) => {
    if (currentStatus === 'Rejected') return;
    const newStatus = currentStatus === 'Played' ? 'Pending' : 'Played';
    handleStatusChange(id, newStatus);
  }, [handleStatusChange]);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Song Title</TableHead>
          <TableHead>Movie</TableHead>
          <TableHead>Submitted By</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suggestions.map((suggestion) => (
          <TableRow key={suggestion.id}>
            <TableCell className="font-medium">{suggestion.songTitle}</TableCell>
            <TableCell>{suggestion.movie}</TableCell>
            <TableCell>{suggestion.name}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(suggestion.submittedAt), { addSuffix: true })}</TableCell>
            <TableCell>
              {suggestion.status === 'Rejected' ? (
                <Badge variant="destructive">Rejected</Badge>
              ) : (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`played-${suggestion.id}`}
                    checked={suggestion.status === 'Played'}
                    onCheckedChange={() => togglePlayedStatus(suggestion.id, suggestion.status)}
                  />
                  <label
                    htmlFor={`played-${suggestion.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {suggestion.status}
                  </label>
                </div>
              )}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Played')}>
                    Mark as Played
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Pending')}>
                    Mark as Pending
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Rejected')}>
                    Mark as Rejected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleDeleteSuggestion(suggestion.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

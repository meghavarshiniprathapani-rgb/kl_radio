'use client';

import { useState } from 'react';
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
import { MoreHorizontal } from 'lucide-react';
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
import { cn } from '@/lib/utils';

interface SuggestionsTableProps {
  suggestions: SongSuggestion[];
}

export function SuggestionsTable({ suggestions: initialSuggestions }: SuggestionsTableProps) {
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>(initialSuggestions);
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: SongSuggestion['status']) => {
    setSuggestions(currentSuggestions =>
      currentSuggestions.map(suggestion =>
        suggestion.id === id ? { ...suggestion, status: newStatus } : suggestion
      )
    );
    toast({
      title: 'Status Updated',
      description: `Song suggestion status changed to ${newStatus}.`,
    });
  };

  const toggleStatus = (id: string, currentStatus: SongSuggestion['status']) => {
    if (currentStatus === 'Pending') {
      handleStatusChange(id, 'Played');
    } else if (currentStatus === 'Played') {
      handleStatusChange(id, 'Pending');
    }
  };
  
  const getBadgeVariant = (status: SongSuggestion['status']) => {
    switch (status) {
      case 'Played':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Song Title</TableHead>
          <TableHead>Artist</TableHead>
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
            <TableCell>{suggestion.artist}</TableCell>
            <TableCell>{suggestion.name}</TableCell>
            <TableCell>{formatDistanceToNow(new Date(suggestion.submittedAt), { addSuffix: true })}</TableCell>
            <TableCell>
              {suggestion.status === 'Rejected' ? (
                <Badge variant="destructive" className="cursor-default">
                  {suggestion.status}
                </Badge>
              ) : (
                <Button
                  variant={getBadgeVariant(suggestion.status)}
                  size="sm"
                  className={cn(
                    'h-auto px-2.5 py-0.5 text-xs font-semibold'
                  )}
                  onClick={() => toggleStatus(suggestion.id, suggestion.status)}
                >
                  {suggestion.status}
                </Button>
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
                  <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Played')}>
                    Mark as Played
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Pending')}>
                    Mark as Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(suggestion.id, 'Rejected')}>
                    Mark as Rejected
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

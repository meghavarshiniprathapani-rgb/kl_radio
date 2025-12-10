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
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface SuggestionsTableProps {
  suggestions: SongSuggestion[];
}

export function SuggestionsTable({ suggestions }: SuggestionsTableProps) {
  const getBadgeVariant = (status: SongSuggestion['status']) => {
    switch (status) {
      case 'Approved':
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
              <Badge variant={getBadgeVariant(suggestion.status)}>{suggestion.status}</Badge>
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
                  <DropdownMenuItem>Approve</DropdownMenuItem>
                  <DropdownMenuItem>Reject</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

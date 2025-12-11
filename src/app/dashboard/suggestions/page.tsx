import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SuggestionsTable } from "./components/suggestions-table";
import type { SongSuggestion } from "@/lib/types";

const suggestions: SongSuggestion[] = [
    { id: '1', name: 'Alice', songTitle: 'Stairway to Heaven', artist: 'Led Zeppelin', submittedAt: '2024-07-26T10:00:00Z', status: 'Pending' },
    { id: '2', name: 'Bob', songTitle: 'Bohemian Rhapsody', artist: 'Queen', submittedAt: '2024-07-26T09:30:00Z', status: 'Played' },
    { id: '3', name: 'Charlie', songTitle: 'Hotel California', artist: 'Eagles', submittedAt: '2024-07-25T18:45:00Z', status: 'Pending' },
    { id: '4', name: 'Diana', songTitle: 'Shape of You', artist: 'Ed Sheeran', submittedAt: '2024-07-25T15:20:00Z', status: 'Rejected' },
    { id: '5', name: 'Ethan', songTitle: 'Billie Jean', artist: 'Michael Jackson', submittedAt: '2024-07-24T12:00:00Z', status: 'Played' },
];

export default function SuggestionsPage() {
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
            <SuggestionsTable suggestions={suggestions} />
        </CardContent>
      </Card>

    </div>
  )
}

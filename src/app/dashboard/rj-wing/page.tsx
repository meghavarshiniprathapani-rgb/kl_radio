
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Newspaper, Podcast } from 'lucide-react';

const mockTodaysScripts = [
  {
    id: '1',
    show: 'Morning Rush',
    title: 'Intro Segment',
    content: 'Good morning, Klians! Welcome to the Morning Rush with RJ Riff. We\'ve got a great show for you today, packed with the latest hits and some classic rock anthems...',
  },
  {
    id: '2',
    show: 'Morning Rush',
    title: 'Weather Update',
    content: 'Time for a quick look at the weather. Expect clear skies today with a high of 32 degrees. Perfect weather to be out and about, but don\'t forget your sunscreen!',
  },
];

const mockTodaysNews = [
    {
        id: '1',
        title: 'City Marathon This Weekend',
        summary: 'The annual city marathon is happening this Sunday. Several roads will be closed from 6 AM to 12 PM. Plan your travel accordingly.',
        source: 'City Traffic Dept.'
    },
];

const mockPodcasts = [
    {
        id: '1',
        title: 'The Rock Chronicles - Episode 4',
        topic: 'Interview with "The Wanderers"',
        status: 'Recording Pending'
    }
];

export default function RJWingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Your Dashboard, RJ
        </h1>
        <p className="text-muted-foreground">
          Everything you need for your upcoming show is right here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6" />
              <div>
                <CardTitle>Today's Live Scripts</CardTitle>
                <CardDescription>Scripts for your shows today.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4">
                {mockTodaysScripts.map((script) => (
                  <Card key={script.id}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{script.title}</CardTitle>
                      <CardDescription>{script.show}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{script.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Newspaper className="h-6 w-6" />
                <div>
                    <CardTitle>Today's News</CardTitle>
                    <CardDescription>News items to cover in your segments.</CardDescription>
                </div>
            </div>
          </CardHeader>
           <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4">
                {mockTodaysNews.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                      <p className="text-xs text-muted-foreground/70 mt-2">Source: {item.source}</p>
                  </div>
                ))}
                 {mockTodaysNews.length === 0 && (
                    <p className="text-sm text-center text-muted-foreground py-10">No news assigned for today.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Podcast className="h-6 w-6" />
            <div>
              <CardTitle>Assigned Podcasts</CardTitle>
              <CardDescription>Podcast episodes assigned to you for recording.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockPodcasts.length > 0 ? (
            <div className="space-y-4">
              {mockPodcasts.map((podcast) => (
                <div key={podcast.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Topic: {podcast.topic}</p>
                  </div>
                  <p className="text-sm font-medium text-primary">{podcast.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground py-10">No podcasts assigned to you at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

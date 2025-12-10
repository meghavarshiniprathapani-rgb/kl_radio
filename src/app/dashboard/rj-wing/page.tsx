
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockScripts = [
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
    {
    id: '3',
    show: 'Rock On',
    title: 'Show Opener',
    content: 'Get ready to rock! This is "Rock On" with RJ Riff, and we are kicking things off with a classic from Led Zeppelin. Turn up the volume!',
  },
];

const mockNews = [
    {
        id: '1',
        title: 'City Marathon This Weekend',
        summary: 'The annual city marathon is happening this Sunday. Several roads will be closed from 6 AM to 12 PM. Plan your travel accordingly.',
        source: 'City Traffic Dept.'
    },
    {
        id: '2',
        title: 'Local Band Releases New Album',
        summary: 'Local favorites "The Wanderers" have just dropped their new album, "City Lights". We\'ll be playing their single later in the show.',
        source: 'Music Weekly'
    }
];

export default function RJWingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          RJ Wing
        </h1>
        <p className="text-muted-foreground">
          Your scripts, assigned news, and show schedule.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Scripts</CardTitle>
            <CardDescription>Scripts for your upcoming shows.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4">
                {mockScripts.map((script) => (
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
            <CardTitle>Assigned News</CardTitle>
            <CardDescription>News items to cover in your segments.</CardDescription>
          </CardHeader>
           <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4">
                {mockNews.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                      <p className="text-xs text-muted-foreground/70 mt-2">Source: {item.source}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

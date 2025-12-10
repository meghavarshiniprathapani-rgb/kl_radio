import { AnnouncementGenerator } from './components/announcement-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Announcements
        </h1>
        <p className="text-muted-foreground">
          Create, manage, and publish station announcements.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Smart Announcement Generator</CardTitle>
          <CardDescription>
            Use AI to generate a draft for your next announcement. Just provide a prompt with the key details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnnouncementGenerator />
        </CardContent>
      </Card>
    </div>
  );
}

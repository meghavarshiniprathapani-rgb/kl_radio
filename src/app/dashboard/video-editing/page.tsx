import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function VideoEditingPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Video Editing Wing
        </h1>
        <p className="text-muted-foreground">
          Video projects, assets, and rendering queue.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Editing Dashboard</CardTitle>
          <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

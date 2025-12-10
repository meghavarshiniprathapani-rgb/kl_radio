import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PRPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          PR Wing
        </h1>
        <p className="text-muted-foreground">
          Manage press releases, social media campaigns, and public relations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PR Dashboard</CardTitle>
          <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

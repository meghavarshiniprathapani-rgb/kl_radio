import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BroadcastingPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Broadcasting Wing
        </h1>
        <p className="text-muted-foreground">
          Live broadcast controls, scheduling, and stream health.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Broadcasting Dashboard</CardTitle>
          <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

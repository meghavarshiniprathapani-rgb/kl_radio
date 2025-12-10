import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CreativePage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Creative Wing
        </h1>
        <p className="text-muted-foreground">
          Tools and resources for the creative team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Creative Dashboard</CardTitle>
          <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

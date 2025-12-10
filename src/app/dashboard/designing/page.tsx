import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DesigningPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Designing Wing
        </h1>
        <p className="text-muted-foreground">
          Access design assets, branding guidelines, and project boards.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Designing Dashboard</CardTitle>
          <CardDescription>This section is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

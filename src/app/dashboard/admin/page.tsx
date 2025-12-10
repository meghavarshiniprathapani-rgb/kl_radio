import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          Admin Panel
        </h1>
        <p className="text-muted-foreground">
          Full administrative control for the Station Head.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Station Management</CardTitle>
          <CardDescription>This section is under construction. Manage users, content, and site settings here.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

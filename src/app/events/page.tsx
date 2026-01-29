'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import ImageTrail from '@/components/ui/ImageTrail';

const imageUrls = [
    'https://ik.imagekit.io/bhanuteja110/default-image.jpg?updatedAt=1759916574560',
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2R8ZW58MHx8fHwxNzY5MzgwNDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1622386010273-646e12d1c02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxkaiUyMGNvbnNvbGV8ZW58MHx8fHwxNzY5NDQ2MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://ik.imagekit.io/bhanuteja110/default-image.jpg?updatedAt=1759916574560',
    'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bGl2ZSUyMG11c2ljfGVufDB8fHx8MTc2OTQxNjUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://ik.imagekit.io/bhanuteja110/default-image.jpg?updatedAt=1759916574560',
    'https://images.unsplash.com/photo-1620736287754-0647f41d1c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb2xsZWdlJTIwZmVzdHxlbnwwfHx8fDE3Njk2NjQ0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1581464628523-fa4f91e15dc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwb2RjYXN0JTIwcmVjb3JkaW5nfGVufDB8fHx8MTc2OTY2NDQ0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://ik.imagekit.io/bhanuteja110/default-image.jpg?updatedAt=1759916574560',
];


export default function EventsPage() {
  // A unique key is needed to force re-render when items change.
  const key = imageUrls.join('');

  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-hidden">
      
      <NavbarKL />
      <main className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 text-center pt-32 pb-20">
            <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
                Past Events
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                A look back at the moments that made us who we are.
            </p>
        </div>
        <div className="relative w-full h-[600px] bg-black">
            <ImageTrail
                key={key}
                items={imageUrls}
                variant={5}
            />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

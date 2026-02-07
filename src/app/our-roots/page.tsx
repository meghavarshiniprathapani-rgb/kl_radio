'use client';

import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const founder = {
  name: 'K. L. Havish',
  role: 'Founder',
  avatarId: 'founder',
  imageUrl: 'https://ik.imagekit.io/bhanuteja110/Radio/1519888823792.jpeg'
};

const ceo = {
    name: 'Chanti Joseph',
    role: 'CEO',
    avatarId: 'ceo',
    imageUrl: 'https://ik.imagekit.io/tz33swtq7h/WhatsApp%20Image%202026-02-07%20at%203.55.13%20PM.jpeg'
};

const exHeads = [
    { name: 'Dr. K. Sarath', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead1/400/400' },
    { name: 'Dr. Habibulla Khan', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead2/400/400' },
    { name: 'K. Sasidhar', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead3/400/400' },
    { name: 'M. Pavan', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead4/400/400' },
    { name: 'M. Revanth', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead5/400/400' },
    { name: 'G. Hemanth', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead6/400/400' },
    { name: 'A. Dheeraj', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead7/400/400' },
    { name: 'B. Varun', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead8/400/400' },
    { name: 'Ch. Amulya', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead9/400/400' },
    { name: 'D. Vinay', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead10/400/400' },
    { name: 'K. Akhil', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead11/400/400' },
    { name: 'T. Hemanth', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead12/400/400' },
    { name: 'B. Abhinav', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead13/400/400' },
    { name: 'D. Anvesh', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead14/400/400' },
    { name: 'V. Sumanth', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead15/400/400' },
    { name: 'M. Sumanth', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead16/400/400' },
    { name: 'P. Jahnavi', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead17/400/400' },
    { name: 'S. Vamsi', role: 'Ex-Head', imageUrl: 'https://picsum.photos/seed/exhead18/400/400' },
];

export default function OurRootsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-foreground">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="https://ik.imagekit.io/bhanuteja110/Radio/Website.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 -z-10" />
      <NavbarKL />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl">
            Our Roots
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            The visionary leaders who paved the way for KL Radio.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
                <Card className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                    <Image src={founder.imageUrl} alt={founder.name} width={256} height={256} className="w-full h-full object-cover" />
                </Card>
                <h3 className="mt-4 text-2xl font-bold">{founder.name}</h3>
                <p className="text-muted-foreground">{founder.role}</p>
            </div>
            <div className="flex flex-col items-center">
                <Card className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                    <Image src={ceo.imageUrl} alt={ceo.name} width={256} height={256} className="w-full h-full object-cover" />
                </Card>
                <h3 className="mt-4 text-2xl font-bold">{ceo.name}</h3>
                <p className="text-muted-foreground">{ceo.role}</p>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="font-headline text-4xl font-bold tracking-tighter md:text-5xl mb-12">
              Former Heads
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {exHeads.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center">
                  <Card className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                    <Image src={member.imageUrl} alt={member.name} width={128} height={128} className="w-full h-full object-cover" />
                  </Card>
                  <h4 className="mt-4 font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

'use client';

import React from 'react';
import { Timeline3D, type TimelineEvent } from '@/components/ui/3d-interactive-timeline';
import { Award, Briefcase, Globe, Book, Radio } from 'lucide-react';
import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';

const TimelinePage: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '2015',
      title: 'KL Radio Founded',
      description: 'KL Radio was established with the vision of creating a vibrant campus community through music, entertainment, and information. The first broadcast hit the airwaves, marking the beginning of a new era in campus life.',
      icon: <Radio className="text-white" />,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Foundation',
    },
    {
      id: '2',
      date: '2017',
      title: 'First Major Event: Samyak',
      description: 'KL Radio successfully organized and covered "Samyak," the university\'s annual techno-cultural fest, for the first time. This event set a new standard for campus event coverage and engagement.',
      icon: <Award className="text-white" />,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
      category: 'Milestone',
      color: 'emerald',
    },
    {
      id: '3',
      date: '2019',
      title: 'Digital Expansion',
      description: 'Launched the first version of the KL Radio website and mobile app, allowing listeners to tune in from anywhere. This expansion brought our content to a global audience.',
      icon: <Globe className="text-white" />,
      image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80',
      category: 'Technology',
      color: 'amber',
    },
    {
      id: '4',
      date: '2021',
      title: 'Introduction of Podcasts',
      description: 'Diversified our content portfolio by launching original podcasts covering a range of topics from technology to student life. This initiative provided a new platform for creative expression.',
      icon: <Briefcase className="text-white" />,
      image: 'https://images.unsplash.com/photo-1581464628523-fa4f91e15dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Content',
      color: 'rose',
    },
    {
      id: '5',
      date: '2023',
      title: 'Community Initiatives',
      description: 'Led several successful social campaigns, including "Say No to Drugs" and mental health awareness drives, strengthening our commitment to social responsibility and student welfare.',
      icon: <Book className="text-white" />,
      image: 'https://images.unsplash.com/photo-1533750349088-249c31122359?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Community',
      color: 'blue',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="https://ik.imagekit.io/bhanuteja110/Radio/WEBSITE_prob3.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <NavbarKL />
      <main className="flex-1">
        <Timeline3D 
          events={timelineEvents}
          primaryColor="bg-primary"
          secondaryColor="bg-accent"
          accentColor="bg-secondary"
        />
      </main>
      <SiteFooter />
    </div>
  );
};

export default TimelinePage;

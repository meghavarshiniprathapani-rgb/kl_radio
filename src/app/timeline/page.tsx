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
      date: '2026–January',
      title: 'Calendar Distribution and Collaboration with NTR district Police department',
      description: 'KL Radio was established with the vision of creating a vibrant campus community through music, entertainment, and information. The first broadcast hit the airwaves, marking the beginning of a new era in campus life.',
      icon: <Radio className="text-white" />,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '2',
      date: '2025-December',
      title: 'College Media team for UDBHAV and College Radio Partner and Media partner for YUVA-2025',
      description: '',
      icon: <Award className="text-white" />,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
      category: 'Milestone',
      color: 'emerald',
    },
    {
      id: '3',
      date: '2025-December',
      title: 'Hoisted and Organised Youth Radio Andhra for the first time at KLU',
      description: '',
      icon: <Globe className="text-white" />,
      image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80',
      category: 'Technology',
      color: 'amber',
    },
    {
      id: '4',
      date: '2025-October',
      title: 'Media Partner for KLSAT 2',
      description: '',
      icon: <Briefcase className="text-white" />,
      image: 'https://images.unsplash.com/photo-1581464628523-fa4f91e15dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Content',
      color: 'rose',
    },
    {
      id: '5',
      date: '2025-September',
      title: 'Resonance and Official Media Partner for SAMYAK - 2025',
      description: '',
      icon: <Book className="text-white" />,
      image: 'https://images.unsplash.com/photo-1533750349088-249c31122359?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Community',
      color: 'blue',
    },
    {
      id: '6',
      date: '2025-August',
      title: 'Media Partner for Parichayamila cover song',
      description: '',
      icon: <Radio className="text-white" />,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '7',
      date: '2026-November',
      title: 'Charity Drive: "Tune in for a Cause"',
      description: 'Organized a successful charity drive, raising funds for a local cause.',
      icon: <Award className="text-white" />,
      image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Community',
      color: 'emerald',
    },
    {
      id: '8',
      date: '2026-December',
      title: 'Website Relaunch with Live Streaming',
      description: 'Upgraded the KL Radio website with a modern design and integrated live streaming capabilities.',
      icon: <Globe className="text-white" />,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Technology',
      color: 'amber',
    },
    {
      id: '9',
      date: '2027-January',
      title: 'First Live Concert Broadcast',
      description: 'Successfully broadcasted a live music concert from the university auditorium.',
      icon: <Briefcase className="text-white" />,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Content',
      color: 'rose',
    },
    {
      id: '10',
      date: '2027-February',
      title: 'KL Radio App Launch',
      description: 'Launched the official KL Radio mobile app for iOS and Android.',
      icon: <Book className="text-white" />,
      image: 'https://images.unsplash.com/photo-1605101230353-c611442d131f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Technology',
      color: 'blue',
    },
    {
      id: '11',
      date: '2027-March',
      title: 'Interview with a Famous Alumnus',
      description: 'Featured an exclusive interview with a distinguished alumnus, sharing their success story.',
      icon: <Radio className="text-white" />,
      image: 'https://images.unsplash.com/photo-1557760205-4f36531c38a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '12',
      date: '2027-April',
      title: 'Reached 10,000 Monthly Listeners',
      description: 'A major milestone for KL Radio, reaching 10,000 unique monthly listeners.',
      icon: <Award className="text-white" />,
      image: 'https://images.unsplash.com/photo-1534330207526-8e8a74ddb71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Milestone',
      color: 'emerald',
    },
    {
      id: '13',
      date: '2027-May',
      title: 'Podcast Network Expansion',
      description: 'Expanded our podcast network to include new shows on various topics.',
      icon: <Globe className="text-white" />,
      image: 'https://images.unsplash.com/photo-1590602848998-335b37b73e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Content',
      color: 'amber',
    },
    {
      id: '14',
      date: '2027-June',
      title: 'Partnership with Local Businesses',
      description: 'Forged partnerships with local businesses for sponsorships and collaborations.',
      icon: <Briefcase className="text-white" />,
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Business',
      color: 'rose',
    },
    {
      id: '15',
      date: '2027-July',
      title: 'Summer Music Festival',
      description: 'Hosted the first annual KL Radio Summer Music Festival, featuring student bands and local artists.',
      icon: <Book className="text-white" />,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
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

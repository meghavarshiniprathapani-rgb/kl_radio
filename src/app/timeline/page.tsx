'use client';

import React from 'react';
import { Timeline3D, type TimelineEvent } from '@/components/ui/3d-interactive-timeline';
import { Award, Briefcase, Globe, Book, Radio } from 'lucide-react';
import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';

const TimelinePage: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '18',
      date: '2026–January',
      title: 'Collaboration with NTR district Police department',
      description: 'KL Radio proudly collaborated with the NTR district Police department, extending our reach and community engagement. This partnership highlights our commitment to social responsibility and working with local authorities to create a positive impact.',
      icon: <Briefcase className="text-white" />,
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Collaboration',
      color: 'sky',
    },
    {
      id: '1',
      date: '2026–January',
      title: 'Calendar Distribution',
      description: 'The KL Radio Calendar was introduced as a thoughtful initiative to document and celebrate important events, festivals, and significant days throughout the year. Designed exclusively for KL Radio, the calendar reflects the organization’s journey, values, and milestones, serving as both a functional guide and a symbol of unity and identity.',
      icon: <Radio className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/2026%20(3).png',
    },
    {
      id: '2',
      date: '2025-December',
      title: 'College Media team for UDBHAV and College Radio Partner and Media partner for YUVA-2025',
      description: 'Udbav is a dynamic platform designed to bridge talent and opportunity. Through this event, KL Radio extends its encouragement not only to university students but also to individuals outside the campus, inviting them to showcase their skills and creativity. Udbav plays a crucial role in identifying emerging talent, providing recognition, and offering exposure at both team and university levels. It fosters confidence, inclusivity, and a strong sense of achievement among participants.',
      icon: <Award className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Udbhav/Udbhav/DSC02004.jpg?updatedAt=1770461341432',
      category: 'Milestone',
      color: 'emerald',
    },
    {
      id: '3',
      date: '2025-December',
      title: 'Hoisted and Organised Youth Radio Andhra for the first time at KLU',
      description: 'The Yuva Event is a meaningful initiative led by Youth Radio Andhra Pradesh with the objective of identifying and nurturing hidden talents among youth. This event serves as a platform to connect with new individuals, encourage creativity, and provide statewide exposure across Andhra Pradesh. By promoting inclusivity and innovation, the Yuva Event empowers young minds and strengthens the voice of youth through expression and collaboration.',
      icon: <Globe className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Yuva/yuva/RAV_0962.JPG?updatedAt=1770461400623',
      category: 'Technology',
      color: 'amber',
    },
    {
      id: '4',
      date: '2025-October',
      title: 'Media Partner for KLSAT 2',
      description: 'KLSAT-2 represents a remarkable achievement in innovation and technological advancement at KL University. The successful development and launch of three satellites in the presence of distinguished authorities stands as a testament to academic excellence and vision. KL Radio proudly served as the media partner for this historic event, contributing to the dissemination of inspiration and highlighting how small dreams can transform into extraordinary realities.',
      icon: <Briefcase className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Klsat/KLSAT/DSC9800.JPG?updatedAt=1770460599413',
      category: 'Content',
      color: 'rose',
    },
    {
      id: '5',
      date: '2025-September',
      title: 'Resonance and Official Media Partner for SAMYAK - 2025',
      description: 'Samyak is one of the most eagerly awaited events in the university, spanning two days that transform into a lifetime of cherished memories. Although defined as 48 hours, Samyak transcends time through its electrifying energy, nonstop DJ performances, guest appearances, reunions, meetups, and countless moments of joy. Students from across the university come together to celebrate friendship, freedom, and festivity, making Samyak a symbol of collective happiness and unforgettable campus life.',
      icon: <Book className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Resonance/_J4A6004.JPG.jpeg',
      category: 'Community',
      color: 'blue',
    },
    {
      id: '6',
      date: '2025-August',
      title: 'Media Partner for Parichayamila cover song',
      description: 'KL Radio continuously supports and encourages the creative talents hidden within university students. *Parichayamila* is a cover song collaboratively produced by students, capturing emotions of love, elegance, and artistic expression. The grand launch of this cover song highlighted teamwork, musical passion, and the dedication of young artists, serving as a proud moment for KL Radio and its creative community.',
      icon: <Radio className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Praichayamilla/Parichayamila/DSC08238.JPG?updatedAt=1770460688250',
    },
    {
      id: '7',
      date: '2025-April',
      title: 'Official Media Partner for FemFlare 2025 and Media Partnered for KL KABADDI premium league',
      description: 'Femflare is a vibrant celebration dedicated to honoring the strength, resilience, and achievements of women. The event brings together inspiring talks, thought-provoking discussions, and powerful performances that highlight the diverse roles women play in society. By creating a platform for expression, dialogue, and inspiration, Femflare encourages confidence, empowerment, and awareness, fostering a supportive environment that celebrates womanhood in all its forms.',
      icon: <Award className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Femflare/femflare/DSC07810_edited.jpg?updatedAt=1770460424103',
      category: 'Community',
      color: 'emerald',
    },
    {
      id: '8',
      date: '2025-February',
      title: 'Radio Fiesta Annual Radio day and Launch of "Mana University Mana Radio News"',
      description: 'Radio Fiesta marks an exciting milestone in KL Radio’s journey of event organization. Building on years of successful initiatives, Radio Fiesta was introduced as a dedicated celebration to showcase talent, creativity, and entertainment. The event brought students together to enjoy performances, engage socially, and create lasting memories, strengthening the sense of unity and joy within the campus.',
      icon: <Globe className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Radio%20Fiesta/Radio%20Fiesta/DSC02124.JPG?updatedAt=1770460766711',
      category: 'Technology',
      color: 'amber',
    },
    {
      id: '9',
      date: '2025-February',
      title: 'Official Media Partner for Surabhi 2025 for the 1st time',
      description: 'Surabhi is a grand cultural extravaganza that brings together a vibrant blend of music, dance, and artistic performances. The event provides a stage for students to showcase their diverse talents and creative expressions, reflecting cultural richness and artistic excellence. Surabhi celebrates unity in diversity by encouraging participation, creativity, and appreciation for the arts, creating an atmosphere filled with color, rhythm, and inspiration.',
      icon: <Briefcase className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Surabi-25/Surabi-25/IMG_1104.JPG?updatedAt=1770461285466',
      category: 'Content',
      color: 'rose',
    },
    {
      id: '10',
      date: '2025-January',
      title: 'Calendar Launch for the 1st time ever',
      description: 'The KL Radio Calendar was introduced as a thoughtful initiative to document and celebrate important events, festivals, and significant days throughout the year. Designed exclusively for KL Radio, the calendar reflects the organization’s journey, values, and milestones, serving as both a functional guide and a symbol of unity and identity.',
      icon: <Book className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Calender/Calendar/DSC01069.JPG?updatedAt=1770460285751',
      category: 'Technology',
      color: 'blue',
    },
    {
      id: '11',
      date: '2024-December',
      title: 'Hosted and Partnered for KL KABADDI LEAGUE Season 3',
      description: 'The Kabaddi event is a high-energy and adrenaline-filled tournament that showcases teamwork, strategy, and physical endurance. Teams compete with passion and determination, displaying sportsmanship and competitive spirit at its finest. The tournament not only promotes physical fitness and discipline but also strengthens camaraderie and unity among participants, making it a thrilling experience for both players and spectators.',
      icon: <Radio className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Kabaddi/KABADDI/WhatsApp%20Image%202026-02-05%20at%2010.58.27%20PM.jpeg?updatedAt=1770460516509',
    },
    {
      id: '12',
      date: '2024-September',
      title: 'Media Partnered for KL KABADDI Season 2 for the First time and Official Media Partner for SAMYAK 2024 for the first time',
      description: 'Samyak is one of the most eagerly awaited events in the university, spanning two days that transform into a lifetime of cherished memories. Although defined as 48 hours, Samyak transcends time through its electrifying energy, nonstop DJ performances, guest appearances, reunions, meetups, and countless moments of joy. Students from across the university come together to celebrate friendship, freedom, and festivity, making Samyak a symbol of collective happiness and unforgettable campus life.',
      icon: <Award className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/Resonance/_J4A6004.JPG.jpeg',
      category: 'Milestone',
      color: 'emerald',
    },
    {
      id: '13',
      date: '2024-September',
      title: 'Initialization of FunFiesta and had Successfully completed 4 Seasons till date',
      description: '',
      icon: <Globe className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/image.png',
      category: 'Content',
      color: 'amber',
    },
    {
      id: '14',
      date: '2024-August',
      title: 'Initiated an event named "SAY NO TO DRUGS WAR"',
      description: 'KL Radio actively contributes to social responsibility by organizing awareness programs focused on critical societal issues. The “Say No to Drugs” initiative aims to educate students about the harmful effects of substance abuse and promote healthy lifestyle choices. Through impactful sessions and outreach programs, KL Radio reinforces the importance of self-discipline, awareness, and responsible decision-making among students.',
      icon: <Radio className="text-white" />,
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Awareness',
      color: 'rose',
    },
    {
      id: '15',
      date: '2024-July',
      title: 'Announcement of New Heads',
      description: '',
      icon: <Book className="text-white" />,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category: 'Community',
      color: 'blue',
    },
    {
      id: '16',
      date: '2024-February',
      title: 'Tune Fest-Annual Radio Celebration and Inauguration of Spotify Podcasts for the First time',
      description: '',
      icon: <Radio className="text-white" />,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: '17',
      date: '2016',
      title: 'KL Radio was Founded',
      description: 'The beginning of a new era in campus communication and entertainment, KL Radio was established to give a voice to the students and create a vibrant community hub.',
      icon: <Radio className="text-white" />,
      image: 'https://ik.imagekit.io/tz33swtq7h/image.png',
      category: 'Foundation',
      color: 'blue',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-x-hidden pt-24">
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

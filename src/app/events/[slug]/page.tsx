import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const events = [
    {
      title: 'Vasantham',
      description: `Not only in campus we are here to explore each every corner associated with your passion. Here we introduce multiple number of talents and the back stories of each and every ornament and the history of sarees that we are carrying forward from few decades`,
      image: 'event-vasantham'
    },
    {
      title: 'Udbav',
      description: `"UDBAV" An event where talent meets the opportunity.. Along with our students we are always encourage  people out of  campus to showcase their talents and grab the recognitions from our Team and the university`,
      image: 'event-udbav'
    },
    {
      title: 'Carnival',
      description: `"CARNIVAL"- For Few minutes we forgot about ourselves , academics. we will vibe for each and every bite of music and create memories which will lock in our cameras`,
      image: 'event-carnival'
    },
    {
      title: 'Samyak',
      description: `2 days which equals to 48 hours but in our definition these two days are not meant for 48 hours which will be equals to lifetime memories...The photos , vedioes, reunions, meetups, catchups, and mainly guests and last but not least non-stop DJ. we don't let our energies down for those two days ..Every single student in this university will be waiting for these night's to hangout with their friends`,
      image: 'event-samyak'
    },
    {
      title: 'Podcasts',
      description: `Till the date you are very familiar without our Liveshows ,podcasts with our lectures, events associated with KLRadio..Here for the first time in the history we did a wonderful Podcasts with the personalities known for their talent along with passions.We are so greatful to have time to gain the knowledge from the great people.`,
      image: 'event-podcasts'
    },
    {
      title: 'Yuva Event',
      description: `Great initiative taken by Youth Radio Andhra. .initiative to meet new persons and encourage the hidden talents and showcase them among all behalf of AP state..`,
      image: 'event-yuva'
    },
    {
      title: 'Ethnic Day',
      description: `meet the students who carry their confidence by their outfits and showcase their way of beauty from their customes`,
      image: 'event-ethnic'
    },
    {
      title: 'Funfesta',
      description: `guys here you can see the components includes songs, dance, translating dailogues , playing games , arranging puzzles and what not!!! I will promise that you will enjoy this events for sure`,
      image: 'event-funfesta'
    },
    {
      title: 'Resonance',
      description: `Hardest good byes includes lifetime memories and endless relationships with our extended family...Our senior radio members are reconiziged by their own talents and new head's are introduced through this event`,
      image: 'event-resonance'
    },
    {
      title: 'Say No To Drugs',
      description: `we are not only succeed in cultural events we did many programmerelated to the topic "SAY NO TO DRUGS"`,
      image: 'event-drugs'
    },
    {
      title: 'SIL Events',
      description: `not only events consists of entertainment, awareness we  conducted events and provided SIL points that students crave for.`,
      image: 'event-sil'
    }
  ];

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = events.find(e => e.image === params.slug);
  const eventImage = PlaceHolderImages.find(p => p.id === params.slug);
  
  const galleryImages = Array.from({ length: 6 }).map((_, i) => ({
    src: `https://picsum.photos/seed/${params.slug}${i}/800/600`,
    alt: `${event?.title} gallery image ${i + 1}`,
  }));

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

        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
             <div className="container mx-auto max-w-4xl px-4">
                {event ? (
                    <div className="bg-background/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10">
                        <div
                            className="w-full h-64 bg-cover bg-center rounded-lg mb-6"
                            style={{ backgroundImage: `url(${eventImage?.imageUrl || 'https://picsum.photos/seed/default/800/400'})` }}
                        ></div>
                        <div className="text-center">
                            <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl mb-4">
                                {event.title}
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg mb-8">
                                {event.description}
                            </p>
                        </div>
                        
                        <div className="mt-12">
                            <h2 className="font-headline text-3xl font-bold tracking-tight text-center mb-8">Event Gallery</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {galleryImages.map((img, index) => (
                                    <Image key={index} src={img.src} alt={img.alt} width={800} height={600} className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Button asChild>
                               <Link href="/events"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Events</Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-background/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10">
                        <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl mb-4">
                            Event Not Found
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg mb-8">
                            The event you are looking for does not exist.
                        </p>
                        <Button asChild>
                           <Link href="/events"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Events</Link>
                        </Button>
                    </div>
                )}
            </div>
        </main>

        <SiteFooter />
    </div>
  );
}

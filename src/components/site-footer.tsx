import { Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Image src="https://ik.imagekit.io/bhanuteja110/image.png" alt="KL Radio Logo" width={20} height={20} className="h-5 w-5" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            KL Radio &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="https://www.instagram.com/kl__radio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

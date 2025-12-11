"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavbarKL = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  const pathname = usePathname();

  // Hide on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-24 flex justify-center items-center z-50 pointer-events-none">
        <header className="w-full max-w-2xl bg-white/10 backdrop-blur-lg text-white flex justify-center px-4 py-3 z-50 rounded-full shadow-lg pointer-events-auto">
          <div className="flex items-center justify-between w-full">
            
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="https://ik.imagekit.io/bhanuteja110/image.png" 
                alt="KL Radio Logo" 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-lg font-semibold text-white">KL Radio</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/#announcements" className="text-sm text-gray-200 hover:text-white transition">
                Announcements
              </Link>
              <Link href="/#suggestions" className="text-sm text-gray-200 hover:text-white transition">
                Suggestions
              </Link>
            </nav>

            <div className="hidden md:block">
              <Link
                href="/login"
                className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Member Login
              </Link>
            </div>

            <motion.button
              className="md:hidden block"
              onClick={toggle}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black text-white pt-24 px-6 z-40 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <button
              className="absolute top-6 right-6 p-2"
              onClick={toggle}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="flex flex-col space-y-6 text-lg">
              <Link href="/#announcements" onClick={toggle}>Announcements</Link>
              <Link href="/#suggestions" onClick={toggle}>Suggestions</Link>

              <Link 
                href="/login" 
                className="mt-4 w-full text-center py-3 bg-red-600 rounded-lg hover:bg-red-700"
                onClick={toggle}
              >
                Member Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { NavbarKL }

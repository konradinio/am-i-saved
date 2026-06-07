"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const publicLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Desktop navigation */}
      <ul className="hidden md:flex items-center gap-6">
        {publicLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-navy-200 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-ivory hover:text-gold transition-colors"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-10 right-0 w-56 bg-navy rounded-xl shadow-xl border border-white/10 p-4 flex flex-col gap-3 md:hidden z-50">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ivory hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <Link href="/login" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-ivory hover:text-gold">
              Sign In
            </Button>
          </Link>
          <Link href="/register" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

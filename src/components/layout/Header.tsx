import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-ivory group-hover:text-gold transition-colors">
            Am I Saved?
          </span>
        </Link>

        {/* Center navigation + right CTAs */}
        <div className="flex items-center gap-4">
          <Navigation />

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-ivory hover:text-gold hover:bg-white/5"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/assessment/start">
              <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold">
                Start Reflection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

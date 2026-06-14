import Link from "next/link";

const DISCLAIMER =
  "Am I Saved? is a spiritual reflection aid. It does not judge your soul, determine salvation, replace sacramental confession, replace spiritual direction, or substitute for professional counseling. Only God knows the human heart.";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto" style={{ backgroundColor: "#071523" }}>
      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Spiritual safety disclaimer */}
        <p className="text-center text-xs text-ivory/50 max-w-2xl mx-auto mb-8 leading-relaxed">
          {DISCLAIMER}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ivory/40">
            &copy; {new Date().getFullYear()} Am I Saved? All rights reserved.
          </p>

          <nav className="flex flex-wrap justify-center gap-4 text-sm text-ivory/50">
            <Link href="/about" className="hover:text-gold transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

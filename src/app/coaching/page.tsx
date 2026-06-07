import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Spiritual Coaching" };

export default function CoachingPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
      <h1 className="text-4xl font-bold text-ivory mb-4">Spiritual Life Coaching</h1>
      <p className="text-ivory/70 text-lg mb-10">
        Work one-on-one with a trained spiritual life coach for personalized guidance,
        accountability, and growth.
      </p>
      {/* TODO (Milestone 13): Add coach profiles and session purchasing */}
      <Link href="/coaching/book">
        <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6 rounded-xl">
          Book a Session
        </Button>
      </Link>
    </div>
  );
}

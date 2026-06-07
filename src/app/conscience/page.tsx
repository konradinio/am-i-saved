import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Examination of Conscience" };

export default function ConsciencePage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
      <h1 className="text-4xl font-bold text-ivory mb-4">Examination of Conscience</h1>
      <p className="text-ivory/70 text-lg mb-4">
        A guided reflection to prepare your heart before God.
      </p>
      <p className="text-ivory/50 text-sm mb-10 border border-white/10 rounded-xl px-6 py-4 bg-white/5 max-w-xl mx-auto">
        This is not sacramental confession. It is a personal reflection aid only.
      </p>
      {/* TODO (Milestone 12): Add path selection (Adult Catholic, Youth Catholic, General Christian) */}
      <Link href="/conscience/start">
        <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6 rounded-xl">
          Begin Examination
        </Button>
      </Link>
    </div>
  );
}

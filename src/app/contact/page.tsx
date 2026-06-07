import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="text-4xl font-bold text-ivory mb-6">Contact</h1>
      <p className="text-ivory/70 mb-8">Have a question? We&apos;d love to hear from you.</p>
      {/* TODO (Future): Add contact form with Resend integration */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 text-ivory/50 text-center">
        Contact form coming soon.
      </div>
    </div>
  );
}

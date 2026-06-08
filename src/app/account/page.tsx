import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/require-user";
import { signOut } from "@/app/actions/auth";

export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const user = await requireUser();

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="text-3xl font-bold text-ivory mb-8">My Account</h1>

      {/* Anonymous session banner */}
      {user.isAnonymous && (
        <div className="border border-gold/30 rounded-2xl p-5 bg-gold/5 mb-6">
          <p className="text-sm text-ivory/80 leading-relaxed">
            You&apos;re using a temporary session. Your data is saved, but it
            will be lost if you clear your browser.{" "}
            <Link href="/register" className="text-gold underline underline-offset-2">
              Create a permanent account
            </Link>{" "}
            to keep your progress.
          </p>
        </div>
      )}

      {/* Profile */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 mb-6">
        <h2 className="text-lg font-semibold text-ivory mb-6">Profile</h2>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm text-ivory/50">Nickname</dt>
            <dd className="text-ivory mt-0.5">
              {user.nickname ?? (
                <span className="text-ivory/30 italic">Not set</span>
              )}
            </dd>
          </div>
          {!user.isAnonymous && (
            <div>
              <dt className="text-sm text-ivory/50">Email</dt>
              <dd className="text-ivory mt-0.5">{user.email}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-ivory/50">Tradition / Denomination</dt>
            <dd className="text-ivory mt-0.5">
              {user.denomination ? (
                denominationLabel(user.denomination)
              ) : (
                <span className="text-ivory/30 italic">Not set</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ivory/50">Member since</dt>
            <dd className="text-ivory mt-0.5">{joinedDate}</dd>
          </div>
          <div>
            <dt className="text-sm text-ivory/50">Account ID</dt>
            <dd className="text-ivory/40 mt-0.5 font-mono text-xs break-all">
              {user.id}
            </dd>
          </div>
        </dl>
      </div>

      {/* Activity — placeholders until M4–M6 */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/5 mb-6">
        <h2 className="text-lg font-semibold text-ivory mb-6">Activity</h2>
        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-ivory/70">Spiritual Assessment</dt>
            <dd className="text-xs text-ivory/30 italic">Coming soon</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-ivory/70">AI Life &amp; Spiritual Coaching</dt>
            <dd className="text-xs text-ivory/30 italic">Coming soon</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-ivory/70">Human Life &amp; Spiritual Coaching</dt>
            <dd className="text-xs text-ivory/30 italic">Coming soon</dd>
          </div>
        </dl>
      </div>

      {/* Spiritual safety disclaimer */}
      <div className="border border-gold/20 rounded-2xl p-6 bg-gold/5 mb-8">
        <p className="text-sm text-ivory/60 leading-relaxed">
          <span className="text-gold font-medium">Important: </span>
          This platform supports your spiritual reflection journey, but it
          cannot and will never declare whether you are saved or not. Only God
          knows the human heart. Use this tool for prayerful self-examination,
          not as a final verdict on your soul.
        </p>
      </div>

      {/* Sign out */}
      <form action={signOut}>
        <button
          type="submit"
          className="w-full py-3 rounded-xl border border-white/10 text-ivory/70 hover:text-ivory hover:border-white/20 transition-colors"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}

function denominationLabel(d: string): string {
  const labels: Record<string, string> = {
    catholic: "Catholic",
    protestant: "Protestant",
    orthodox: "Orthodox",
    non_denominational: "Non-Denominational",
    non_christian: "Non-Christian / Exploring",
    unsure: "Not Sure",
  };
  return labels[d] ?? d;
}

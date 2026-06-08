import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign In" };

type Props = {
  searchParams: Promise<{ redirect?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { redirect, error } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-3xl font-bold text-ivory mb-2 text-center">
        Sign In
      </h1>
      <p className="text-ivory/60 text-center mb-10">
        Continue your spiritual reflection journey.
      </p>
      {error === "auth_callback_failed" && (
        <p className="text-red-400 text-sm text-center mb-6" role="alert">
          The sign-in link was invalid or has expired. Please try again.
        </p>
      )}
      <LoginForm redirectTo={redirect} />
    </div>
  );
}

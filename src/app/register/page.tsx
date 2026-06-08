import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-md">
      <h1 className="text-3xl font-bold text-ivory mb-2 text-center">
        Create Account
      </h1>
      <p className="text-ivory/60 text-center mb-10">
        Begin your spiritual reflection journey.
      </p>
      <RegisterForm />
    </div>
  );
}

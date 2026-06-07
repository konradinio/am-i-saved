// Auth guard — use in Server Components and Server Actions to protect routes.
// NEVER trust client-side auth state. Always verify server-side.
// TODO (Milestone 2): Implement real session verification via Supabase Auth.
import { redirect } from "next/navigation";

export type AuthUser = {
  id: string;
  email: string;
};

// Call at the top of any protected Server Component or Server Action.
// Redirects to /login if no valid session exists.
export async function requireUser(): Promise<AuthUser> {
  // TODO (Milestone 2): Replace with real Supabase session check.
  // const supabase = await createClient();
  // const { data: { user }, error } = await supabase.auth.getUser();
  // if (error || !user) redirect("/login");
  // return { id: user.id, email: user.email! };

  // Placeholder — always redirect in production until auth is implemented.
  redirect("/login");
}

// Soft check — returns null instead of redirecting. Use for conditional UI.
export async function getOptionalUser(): Promise<AuthUser | null> {
  // TODO (Milestone 2): Replace with real Supabase session check.
  return null;
}

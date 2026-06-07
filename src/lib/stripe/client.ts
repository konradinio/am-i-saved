// Stripe browser client — uses only the publishable key.
// Safe for use in Client Components.
// TODO (Milestone 7): Initialize Stripe.js for Checkout redirect.
import { loadStripe } from "@stripe/stripe-js";

let stripePromise: ReturnType<typeof loadStripe>;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

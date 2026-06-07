// Stripe server client — uses the secret key. Server-side only.
// NEVER import this in a Client Component.
// TODO (Milestone 7): Implement checkout session creation, webhook verification.
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// TODO (Milestone 7): Implement createCheckoutSession()
// TODO (Milestone 7): Implement constructWebhookEvent()
// TODO (Milestone 7): Implement verifyPayment()

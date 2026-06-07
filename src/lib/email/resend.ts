// Resend email service — server-side only.
// NEVER import this in a Client Component.
// TODO (Milestone 10): Implement sendReportEmail(), sendGiftRedemptionEmail(), sendCoachingConfirmation().
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "noreply@amisaved.app";

// Security rule: Never embed sensitive report content in the email body.
// Always send a secure download link instead.

// TODO (Milestone 10): sendReportEmail(userId: string, assessmentId: string): Promise<void>
// TODO (Milestone 10): sendGiftRedemptionEmail(recipientEmail: string, code: string): Promise<void>
// TODO (Milestone 10): sendCoachingConfirmation(bookingId: string): Promise<void>

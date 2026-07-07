import type { ContactFormData } from "@/types/contact";
import { projectTypeLabels, budgetLabels, timelineLabels } from "@/types/contact";

// Escape user-supplied values before interpolating into the HTML email body,
// so a submitted name/message can't inject markup or links into the inbox.
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  // Explicit opt-out for e2e/CI runs against a production server: logs the
  // submission instead of sending. Never set this on a real deployment.
  const dryRun = process.env.CONTACT_FORM_DRY_RUN === "1";

  if (dryRun || !apiKey) {
    // In production a missing key must fail loudly — returning success here
    // would show the visitor "Message sent" while the inquiry is dropped.
    if (!dryRun && process.env.NODE_ENV === "production") {
      throw new Error(
        "RESEND_API_KEY is not configured — refusing to silently drop a contact submission."
      );
    }
    console.log("------ Contact Form Submission (dev fallback) ------");
    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("Project Type:", projectTypeLabels[data.projectType]);
    console.log("Budget:", budgetLabels[data.budget]);
    console.log("Timeline:", timelineLabels[data.timeline]);
    console.log("Message:", data.message);
    console.log("----------------------------------------------------");
    return { success: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #111;">New Project Inquiry from ${esc(data.name)}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Name</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${esc(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${encodeURIComponent(data.email)}">${esc(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Project Type</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${projectTypeLabels[data.projectType]}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Budget</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${budgetLabels[data.budget]}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Timeline</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${timelineLabels[data.timeline]}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #555; font-size: 14px;">Message</h3>
        <p style="margin: 0; white-space: pre-wrap; color: #111;">${esc(data.message)}</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "Portfolio Contact <noreply@rohansuresh.dev>",
    to: contactEmail || "rohanpsuresh@gmail.com",
    subject: `New Project Inquiry from ${data.name}`,
    html,
  });

  return { success: true };
}

import type { ContactFormData } from "@/types/contact";
import { projectTypeLabels, budgetLabels, timelineLabels } from "@/types/contact";

export async function sendContactEmail(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
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
      <h2 style="color: #111;">New Project Inquiry from ${data.name}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Name</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
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
        <p style="margin: 0; white-space: pre-wrap; color: #111;">${data.message}</p>
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

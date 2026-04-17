import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

type GitHubWebhookPayload = {
  action?: string;
  issue?: {
    number: number;
    title: string;
    body: string;
    state: string;
    html_url: string;
    user?: {
      login: string;
    };
  };
  comment?: {
    body: string;
    user?: {
      login: string;
    };
  };
};

function extractEmailFromIssueBody(body: string): string | null {
  const match = body.match(/<!-- CONTACT_EMAIL: (.+?) -->/);
  return match ? match[1] : null;
}

function verifyGitHubSignature(payload: string, signature: string): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET || "";
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return `sha256=${hash}` === signature;
}

async function sendNotificationEmail(
  to: string,
  subject: string,
  message: string,
  issueUrl: string,
) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || !to || to === "none") {
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@modulbit.com",
        to,
        subject,
        html: `
          <h2>${subject}</h2>
          <p>${message}</p>
          <p><a href="${issueUrl}">View issue on GitHub</a></p>
          <hr />
          <p><small>This is an automated notification from Modulbit bug reporting system.</small></p>
        `,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send email:", await response.text());
    }
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-hub-signature-256") || "";

  // Verify GitHub signature
  const bodyText = await request.text();
  if (!verifyGitHubSignature(bodyText, signature)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload: GitHubWebhookPayload;
  try {
    payload = JSON.parse(bodyText) as GitHubWebhookPayload;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const issue = payload.issue;
  if (!issue) {
    return NextResponse.json({ message: "No issue data" }, { status: 400 });
  }

  const email = extractEmailFromIssueBody(issue.body);

  // Handle different webhook actions
  if (payload.action === "opened") {
    await sendNotificationEmail(
      email || "",
      `New response on your bug report: ${issue.title}`,
      `Your bug report has been received and is being reviewed.`,
      issue.html_url,
    );
  }

  if (payload.action === "closed") {
    await sendNotificationEmail(
      email || "",
      `Bug report closed: ${issue.title}`,
      `Your bug report has been closed. ${issue.state === "closed" ? "The issue may have been resolved or deemed not reproducible." : ""}`,
      issue.html_url,
    );
  }

  if (payload.action === "reopened") {
    await sendNotificationEmail(
      email || "",
      `Bug report reopened: ${issue.title}`,
      `Your bug report has been reopened for further investigation.`,
      issue.html_url,
    );
  }

  if (payload.action === "created" && payload.comment) {
    await sendNotificationEmail(
      email || "",
      `New comment on your bug report: ${issue.title}`,
      `There's a new comment from ${payload.comment.user?.login || "someone"}:\n\n"${payload.comment.body}"`,
      issue.html_url,
    );
  }

  return NextResponse.json({ message: "Webhook processed" }, { status: 200 });
}

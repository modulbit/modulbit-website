import { NextResponse } from "next/server";
import { TICKETS_OWNER, TICKETS_REPO } from "@/lib/tickets";

const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 4000;
const MAX_EMAIL_LENGTH = 200;
const MAX_PAGE_URL_LENGTH = 500;

type BugReportPayload = {
  title?: unknown;
  description?: unknown;
  email?: unknown;
  pageUrl?: unknown;
};

function toTrimmedString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const githubToken = process.env.GITHUB_TICKETS_TOKEN;

  if (!githubToken) {
    return NextResponse.json(
      { message: "Server configuration missing." },
      { status: 503 },
    );
  }

  let body: BugReportPayload;

  try {
    body = (await request.json()) as BugReportPayload;
  } catch {
    return NextResponse.json({ message: "Incorrect format." }, { status: 400 });
  }

  const title = toTrimmedString(body.title, MAX_TITLE_LENGTH);
  const description = toTrimmedString(body.description, MAX_DESCRIPTION_LENGTH);
  const email = toTrimmedString(body.email, MAX_EMAIL_LENGTH);
  const pageUrl = toTrimmedString(body.pageUrl, MAX_PAGE_URL_LENGTH);

  if (!title || !description) {
    return NextResponse.json({ message: "Name and description are required." }, { status: 400 });
  }

  const reportTimestamp = new Date().toISOString();
  const issueBody = [
    "## Bug report pro modulbit",
    "",
    `**Reported:** ${reportTimestamp}`,
    email ? `**Contact:** ${email}` : "**Contact:** empty",
    pageUrl ? `**Website URL:** ${pageUrl}` : "**Website URL:** empty",
    "",
    "### Description",
    description,
    "",
    "---",
    `<!-- CONTACT_EMAIL: ${email || "none"} -->`,
  ].join("\n");

  let githubResponse: Response;

  try {
    githubResponse = await fetch(
      `https://api.github.com/repos/${TICKETS_OWNER}/${TICKETS_REPO}/issues`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${githubToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `[Bug report] ${title}`,
          body: issueBody,
        }),
      },
    );
  } catch {
    return NextResponse.json(
      { message: "Connect to GitHub API failed. Please try again later." },
      { status: 502 },
    );
  }

  if (!githubResponse.ok) {
    return NextResponse.json(
      { message: "Ticket creation failed. Please try again later." },
      { status: 502 },
    );
  }

  let createdIssue: { html_url?: string; number?: number };

  try {
    createdIssue = (await githubResponse.json()) as { html_url?: string; number?: number };
  } catch {
    return NextResponse.json(
      { message: "Ticket has been processed, but failed to verify the answer from GitHub." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    issueUrl: createdIssue.html_url ?? null,
    issueNumber: createdIssue.number ?? null,
  });
}

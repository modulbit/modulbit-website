import { NextResponse } from "next/server";

const TICKETS_OWNER = "modulbit";
const TICKETS_REPO = "tickets";
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
      { message: "Chybí serverová konfigurace pro vytváření ticketů." },
      { status: 503 },
    );
  }

  let body: BugReportPayload;

  try {
    body = (await request.json()) as BugReportPayload;
  } catch {
    return NextResponse.json({ message: "Neplatný formát požadavku." }, { status: 400 });
  }

  const title = toTrimmedString(body.title, MAX_TITLE_LENGTH);
  const description = toTrimmedString(body.description, MAX_DESCRIPTION_LENGTH);
  const email = toTrimmedString(body.email, MAX_EMAIL_LENGTH);
  const pageUrl = toTrimmedString(body.pageUrl, MAX_PAGE_URL_LENGTH);

  if (!title || !description) {
    return NextResponse.json({ message: "Název i popis chyby jsou povinné." }, { status: 400 });
  }

  const createdAt = new Date().toISOString();
  const issueBody = [
    "## Bug report z webu modulbit-website",
    "",
    `**Nahlášeno:** ${createdAt}`,
    email ? `**Kontakt:** ${email}` : "**Kontakt:** neuveden",
    pageUrl ? `**URL stránky:** ${pageUrl}` : "**URL stránky:** neuvedena",
    "",
    "### Popis",
    description,
  ].join("\n");

  const githubResponse = await fetch(
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

  if (!githubResponse.ok) {
    return NextResponse.json(
      { message: "Ticket se nepodařilo vytvořit. Zkus to prosím znovu později." },
      { status: 502 },
    );
  }

  const issueData = (await githubResponse.json()) as { html_url?: string; number?: number };

  return NextResponse.json({
    issueUrl: issueData.html_url ?? null,
    issueNumber: issueData.number ?? null,
  });
}

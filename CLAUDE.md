@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# ModulBit

ModulBit is a small startup building Tara, an AI assistant designed for elderly users
who struggle with modern technology. Our target group is often overlooked, but we believe
they deserve tools that are simple, respectful, and actually helpful.

## Tara

Tara is an AI-powered assistant that helps elderly users with everyday tech tasks –
things like writing an email, printing a document, or navigating a website. The core
principle is that Tara should feel like asking a patient, knowledgeable friend for help,
not like using a complicated app.

### Key UX principles
- Large, readable text – no small fonts or dense layouts
- No technical jargon – explain things in plain language
- Forgiving UI – easy to undo mistakes, clear confirmations before any action
- Simple navigation – minimal options on screen at once

## Privacy & data
- Authentication is handled by Clerk
- AI responses go through OpenRouter (GDPR compliant, does not store user content)
- Usage analytics via PostHog (self-hosted or cloud – TBD)
- Conversations are stored until the user deletes them or after 2 years of inactivity
- We are based in the EU and comply with GDPR

## Infrastructure
- All services run on our own infrastructure (tara.modulbit.eu, api.modulbit.eu)
- Code is hosted on our self-hosted Forgejo instance at git.modulbit.eu
- Secrets are managed via Bitwarden Secrets Manager

---

# Workspace layout

This directory is not itself a git repository — each subdirectory is a separate repo cloned from `git.modulbit.eu/modulBit/<name>` (some are mirrored to `github.com/modulbit`). Always check which repo you are in before committing.

| Repo | What it is |
|---|---|
| `modulbit-api` | Go backend API (the working API behind Tara's features, e.g. AI email writing) |
| `modulbit-website` | Next.js marketing/company website |
| `tara-backend` | Tara product backend — **placeholder, README only so far** |
| `tara-frontend` | Tara product frontend — **placeholder, README only so far** |
| `tara-tracking` | Tracking issues for Tara — **placeholder, README only so far** |
| `ansible` | Infrastructure-as-code: playbooks/roles that bootstrap servers and deploy all services |
| `internal-docs` | Internal how-to docs (git, ssh, gpg, servers, services, team policies) |
| `decisions-public` / `decisions-internal` | ADR-style decision records (public vs. private) |
| `security` | Incident postmortems under `incidents/<year>/<month>/` |
| `modulbit-design` | Brand assets: logos, color palette, typography |

## How the repos relate

- `modulbit-api` is the HTTP API (Clerk auth, OpenRouter for LLM calls, Postgres + Redis). The Tara frontend (`tara-frontend`, not yet started) will consume it. Routes are versioned under `/v3/`.
- `ansible` deploys everything: each subfolder of `ansible/roles/docker-compose/` is one deployed service (currently `authentik`, `gatus`, `pomerium`, `vaultwarden`, `modulbit-website`; `_starter` is the template for new services). The repo is mirrored to the control host every 15 minutes; CI builds Docker images that these roles pull from the Forgejo registry at `git.modulbit.eu`.
- `internal-docs/services/` documents the same services that `ansible` deploys.
- Decisions are proposed as issues (templates in `.github/ISSUE_TEMPLATE/`), then recorded as numbered ADRs in `decisions/<year>/<month>/NNNN-slug.md` with a detached GPG signature (`.md.asc`) alongside. Template: `decisions/templates/adr.md`.
- The website's `/report-bug` page files issues into a `modulbit/tickets` repo via the GitHub API.

# Per-repo guide

## modulbit-api (Go)

- **Stack:** Go 1.26, stdlib `net/http` with method-pattern routing (`mux.HandleFunc("GET /v3/...")`) — no web framework. `pgx/v5` (Postgres), `go-redis/v9`, `clerk-sdk-go/v2`, `godotenv`. No ORM; raw SQL, schema in `schema.sql` (loaded by docker-compose init).
- **Structure:** `main.go` does env loading, client wiring, and route registration; all handlers live in `pkg/handlers/handlers.go` as methods on the `handlers.Env` struct (which carries DB, Redis, HTTP client, OpenRouter config). Tests in `pkg/handlers/handlers_test.go`.
- **Run locally:** copy `.env.example` to `.env`, then `docker compose up` (API + Postgres 16 + Redis 7, schema auto-applied), or `go run .` against locally running Postgres/Redis. `GO_ENV=development` enables mock auth so a Clerk key isn't required.
- **Test/lint:** `go test ./...` and `go vet ./...` (this is what CI runs). Single test: `go test ./pkg/handlers -run TestName`.
- **Conventions:** handler methods named `Handle*`; small lowercase helpers (`writeJSON`, `writeSSE`, request/response structs unexported with `json` tags); startup failures use `log.Fatal` with an `ERROR:` prefix; request errors are returned via `writeJSON` with proper status codes. Quotas are tracked in Redis with a daily Postgres reconciliation goroutine (`DailyReconciliation`). Email generation streams via SSE from OpenRouter.

## modulbit-website (Next.js)

- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, ESLint 9, `reactflow` for the roadmap visualization.
- **Important:** the repo's own `CLAUDE.md`/`AGENTS.md` warns that this Next.js version has breaking changes vs. training data — read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code in this repo.
- **Structure:** pages under `app/` (one folder per route: `about-us`, `explore-projects`, `get-involved`, `report-bug`, `roadmap`), API routes under `app/api/*/route.ts` (`bug-report`, `github-webhook`), shared components in `components/`, helpers in `lib/`. Path alias `@/*` maps to repo root.
- **Run locally:** `npm install`, then `npm run dev` (http://localhost:3000). Build with `npm run build`, lint with `npm run lint`. The bug-report API needs `GITHUB_TICKETS_TOKEN` set. Production builds run in Docker (standalone output, port 3000); CI pushes the image to the Forgejo registry on every push to `main`.
- **Conventions:** kebab-case file names with PascalCase arrow-function components; Tailwind utility classes inline (brand colors used directly, e.g. `bg-[#181d24]`, plus an `accent` color); brand fonts Poppins (headings/branding) and Inter (body) per `modulbit-design/fonts/fonts.md`; brand palette in `modulbit-design/colors/palette.md`.

## ansible

- **Structure:** standard layout — `inventory/` (inventory.yml plus `group_vars`/`host_vars`), `playbooks/` (`bootstrap/`, `docker/deploy-services.yml`, `reboot/`, `update-packages.yml`), `roles/`. Every role should have `defaults/main.yml` if it needs variables. New docker services start from `roles/docker-compose/_starter`.
- **Access control convention:** every playbook starts with a `# ansible-run-groups: <groups>` comment line (before the `---`) listing which sysadmin groups may run it; `sysadmin-main` can run everything.
- **Run:** playbooks are normally run from the control host (`ssh USER@ansible@pm.modulbit.eu`, then `ansible-run sub-directory/playbook.yml`) — see `internal-docs/ansible/running-a-playbook.md`. `ansible.cfg` paths (`/opt/ansible/...`, vault password file) assume the control host; adjust if running locally. Secrets live in `inventory/group_vars/all/vault.yml` (ansible-vault).
- **Lint:** CI runs `ansible-lint` (profile: moderate) and `yamllint .` (2-space indentation, line-length disabled) on every push/PR — run both before pushing.

## Docs/decisions/design repos

- `decisions-*`: copy `decisions/templates/adr.md` to `decisions/<year>/<month>/NNNN-slug.md`, fill in status/date/context/decision, and add a detached GPG signature as `NNNN-slug.md.asc`. Proposals start as issues using the issue templates.
- `security`: postmortems as `incidents/<year>/<month>/YYYY-MM-DD-slug.md`.
- `internal-docs`: one folder per topic, guides as markdown (`services/<service>/` for per-service guides).
- `modulbit-design`: source of truth for brand colors (`colors/palette.md`) and typography (`fonts/fonts.md`). Use these when styling anything user-facing.

# Git conventions

- Default branch is `main` everywhere; work happens on branches named `<username>-<topic>` (e.g. `smoliicek-votepolicy`, `jonashubeny-patch-1`) merged via pull request on Forgejo.
- Commit messages: the code and docs repos (`modulbit-api`, `internal-docs`, `security`) use Conventional Commits — `feat:`, `fix:`, `chore:` with an optional scope, e.g. `feat(CI/CD): add workflows for building the image`, `fix(handlers.go): specify the models we are actually gonna use`. Follow that style; history in some repos is informal, but conventional commits are the standard to write.
- CI runs on Forgejo Actions (`.forgejo/workflows/`); `modulbit-api` also has a GitHub Actions mirror workflow (`.github/workflows/ci.yml`).

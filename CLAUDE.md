@AGENTS.md

# Project Documentation Governance

## End-of-Milestone Documentation Rule

At the end of every milestone, before committing, update ALL four of these files:

1. **`docs/PROJECT_LOG.md`** — Add a new dated entry with: summary of changes, architectural decisions made, security decisions, product decisions, known limitations, next steps.
2. **`docs/ACTIVE_MILESTONE.md`** — Update current milestone status, deliverables checklist, open issues, and next milestone preview.
3. **`docs/DEVELOPMENT_HISTORY.md`** — Add a new entry under "Milestone History" covering: decisions, commands run, files created/changed, validation results, issues introduced, issues resolved.
4. **`docs/CLAUDE_SESSION_HANDOFF.md`** — Update the entire file to reflect the new current state: snapshot, environment status, completed work, open issues, risks, pending integrations, recommended next step.

Documentation commits use the two-commit rule:
- Commit 1: `docs/` only → `docs: <description>`
- Commit 2: all other files → `feat: <description>` or `chore: <description>`

A future Claude session must never depend on chat history.
All project knowledge must exist inside the repository.

## Session Bootstrap

A new Claude session should read these files before writing any code:
1. `docs/CLAUDE_SESSION_HANDOFF.md`
2. `CLAUDE.md` (this file)
3. `docs/ACTIVE_MILESTONE.md`
4. `docs/ARCHITECTURE_MASTER.md`
5. `docs/PROJECT_LOG.md`

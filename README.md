# ridnois.github.io

Personal site and resume for Sebastian Altamirano (Ridnois), a software engineer. Next.js (App Router, static export) deployed to GitHub Pages.

## Single source of truth

Everything is generated from `lib/resume-data.ts`. Edit it once and these all update:

| Surface | Route |
| --- | --- |
| Interactive site | `/` |
| Plain HTML resume | `/resume` |
| LLM summary ([llms.txt](https://llmstxt.org)) | `/llms.txt` |
| [JSON Resume](https://jsonresume.org/schema) | `/resume.json` |
| Structured data | JSON-LD in `<head>` |

`public/resume.pdf` is the only hand-maintained file; regenerate it when the data changes.

## Develop

```bash
pnpm dev     # http://localhost:3000
pnpm test    # vitest
pnpm lint
pnpm build   # static export to ./out
```

# agent-toolkit-docs

- `planning/website.COPY.md` is the authoritative copy: never reword user-visible text without
  Francesco's approval. `planning/website.DESIGN.md` holds layout/visuals,
  `planning/website.DECISIONS.md` scope and tech.
- Copy rules: no dashes as punctuation, straight apostrophes. The em dashes in the conversational
  bullet and the pink demo replies are deliberate.
- Never guess a skill's behavior in copy or demo specs: read its `SKILL.md` in
  `../agent-toolkit/skills/` and the articles linked from
  `../agent-toolkit/docs/core-philosophy.md`.
- Demos are generated: edit `demos/specs/*.yaml`, never a `.cast` file. `npm run build` compiles
  them (plus `llms.txt` and the social card) before `astro build`.
- No binaries or build output in git.
- `npm test` runs the cast compiler tests and, if `dist/` exists, the page content checks.
- Every PR gets a Cloudflare Pages preview (`.github/workflows/preview.yml`), built with
  `SITE_BASE=/` (previews serve at a domain root): keep paths on `import.meta.env.BASE_URL`,
  never hardcode the base. Needs repo secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`,
  and a direct-upload Pages project (the build reads the agent-toolkit checkout, so Cloudflare
  can't build it).
- Before launch: create the GoatCounter site, then uncomment the analytics script tag in
  `src/layouts/Base.astro` and replace `GOATCOUNTER_CODE` with the real code.

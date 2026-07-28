# agent-toolkit-docs

- `planning/website.COPY.md` is the authoritative copy: never reword user-visible text without
  Francesco's approval. `planning/website.DESIGN.md` holds layout/visuals,
  `planning/website.DECISIONS.md` scope and tech.
- Copy rules: no dashes as punctuation, straight apostrophes. The em dashes in the conversational
  bullet and the pink demo replies are deliberate.
- Demos are generated: edit `demos/specs/*.yaml`, never a `.cast` file. `npm run build` compiles
  them (plus `llms.txt` and the social card) before `astro build`.
- No binaries or build output in git.
- `npm test` runs the cast compiler tests and, if `dist/` exists, the page content checks.
- Before launch: create the GoatCounter site, then uncomment the analytics script tag in
  `src/layouts/Base.astro` and replace `GOATCOUNTER_CODE` with the real code.

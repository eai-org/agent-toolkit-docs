let cached: string | null | undefined;

/** '★ 1,234', or null when the API is unreachable or errors */
export async function starLabel(): Promise<string | null> {
  if (cached !== undefined) return cached;
  try {
    const r = await fetch('https://api.github.com/repos/eai-org/agent-toolkit');
    cached = r.ok
      ? `★ ${((await r.json()).stargazers_count as number).toLocaleString('en-US')}`
      : null;
  } catch {
    cached = null; // offline build: no count
  }
  return cached;
}

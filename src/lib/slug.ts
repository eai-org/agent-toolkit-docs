/** 'Execute the plan' -> 'execute-the-plan'; skill names pass through unchanged */
export const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const SESSION_COOKIE = "oj_admin_session";

function adminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password ? password : null;
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function adminSessionToken(): Promise<string | null> {
  const password = adminPassword();
  if (!password) return null;
  return sha256(`${password}:organic-jaipur-admin`);
}

export async function isValidAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await adminSessionToken();
  return expected !== null && token === expected;
}

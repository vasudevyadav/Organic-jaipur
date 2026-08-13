export const SESSION_COOKIE = "oj_admin_session";

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function adminSessionToken(): Promise<string> {
  return sha256(`${process.env.ADMIN_PASSWORD ?? ""}:organic-jaipur-admin`);
}

export async function isValidAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await adminSessionToken();
  return token === expected;
}

import { readSession } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const user = readSession(request);
  return Response.json({
    ok: true,
    authenticated: Boolean(user),
    username: user?.username ?? null,
  });
}

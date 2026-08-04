import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { saveInstallation } from "@/features/github/server/installation";
import { getServerSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";

function buildSignInCallbackUrl(installationId: string | null): string {
  if (installationId) {
    return `/api/github/callback?installation_id=${installationId}`;
  }

  return DASHBOARD_ROUTES.github;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const installationId = searchParams.get("installation_id");
  const session = await getServerSession();

  if (!session) {
    const callbackUrl = buildSignInCallbackUrl(installationId);
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (installationId) {
    const numericId = Number(installationId);

    if (
      !Number.isFinite(numericId) ||
      numericId <= 0 ||
      !Number.isInteger(numericId)
    ) {
      return Response.json(
        { error: "Invalid installation ID" },
        { status: 400 },
      );
    }

    await saveInstallation(session.user.id, numericId);
  }

  redirect(DASHBOARD_ROUTES.github);
}

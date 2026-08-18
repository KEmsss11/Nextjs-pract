import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  await supabase.auth.getUser();

  return NextResponse.redirect(
    new URL("/dashboard", process.env.NEXT_PUBLIC_SITE_URL)
  );
}

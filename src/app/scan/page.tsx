import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ScanPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        PDF Scan
      </h1>

      <p>Upload and scan your PDF here.</p>
    </div>
  );
}
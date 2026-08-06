import Link from "next/link";
import { LayoutDashboard, ScanSearch, History } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-6">My Dashboard</h2>

      <ul className="space-y-3">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-slate-700"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/scan"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-slate-700"
          >
            <ScanSearch size={18} />
            PDF Scan
          </Link>
        </li>

        <li>
          <Link
            href="/history"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-slate-700"
          >
            <History size={18} />
            History
          </Link>
        </li>
      </ul>
    </aside>
  );
}
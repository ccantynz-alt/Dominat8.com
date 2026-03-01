import React from "react";
import Link from "next/link";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";

type Project = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string | Date;
};

async function fetchProjects(): Promise<Project[]> {
  return [];
}

export default async function AdminProjectsPage() {
  const projects = await fetchProjects();
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  if (!hasProjects) {
    return (
      <div className="space-y-6">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GlossyIcon name="layers" size={36} />
          <div>
            <div className="text-xs font-semibold tracking-wide text-white/60">PROJECTS</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Projects</h1>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-8 text-center">
          <GlossyIcon name="layers" size={48} style={{ margin: "0 auto" }} />
          <h2 className="mt-4 text-lg font-semibold">No projects yet</h2>
          <p className="mt-2 text-sm text-white/60">
            Get started by creating your first project. Generate a site from a template and manage everything here.
          </p>
          <Link
            href="/templates"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
          >
            <GlossyIconInline name="rocket" size={16} />
            Create project
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GlossyIcon name="layers" size={36} />
          <div>
            <div className="text-xs font-semibold tracking-wide text-white/60">PROJECTS</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Projects</h1>
          </div>
        </div>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          <GlossyIconInline name="rocket" size={16} />
          New project
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/30 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/50">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/50">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/50">Created</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">{p.name}</td>
                <td className="px-6 py-4 text-sm text-white/60">{p.description ?? "—"}</td>
                <td className="px-6 py-4 text-sm text-white/60">
                  {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-sm font-medium hover:underline"
                    style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    <GlossyIconInline name="arrow-right" size={12} /> Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

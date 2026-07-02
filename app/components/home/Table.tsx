import { useMemo } from "react";
import { Link, useLocation } from "react-router";
import { StatusPill } from "~/components/shared/StatusPill";
import type { TableRow } from "~/types/TableRow";

interface TableProps {
  rows: TableRow[];
}

export function Table({ rows }: TableProps) {
  const location = useLocation();

  const renderedRows = useMemo(
    () =>
      rows.map((row, index) => (
        <tr key={row.id} className={index % 2 === 0 ? "bg-slate-900" : "bg-slate-950"}>
          <td className="px-4 py-3">
            <img loading="lazy"
              src={row.image}
              alt={row.name}
              height={40}
              width={40}
              className="h-10 w-10 rounded-full object-cover" />
          </td>
          <td className="px-4 py-3">
            <Link
              to={`/profile/${row.id}`}
              state={{ from: { pathname: location.pathname, search: location.search } }}
              className="font-medium text-slate-100 underline-offset-4 hover:underline"
            >
              {row.name}
            </Link>
          </td>
          <td className="px-4 py-3">{row.species}</td>
          <td className="px-4 py-3">
            <StatusPill status={row.status} />
          </td>
        </tr>
      )),
    [location.pathname, location.search, rows],
  );

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-700 m-1">
      <table className="min-w-full border-collapse text-left text-sm text-slate-200">
        <thead className="bg-slate-800 text-slate-100">
          <tr>
            <th className="px-4 py-3">Avatar</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Species</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-slate-400">
                  No characters data available.
                </td>
              </tr>
            ) :
              renderedRows}
        </tbody>
      </table>
    </div>
  );
}

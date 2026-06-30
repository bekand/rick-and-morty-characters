import { Link } from "react-router";
import { StatusPill } from "~/components/shared/StatusPill";
import type { TableRow } from "~/types/TableRow";

interface TableProps {
  rows: TableRow[];
}

export function Table({ rows }: TableProps) {
  return (
    <div className="m-5 lg:mx-auto lg:max-w-[75%] overflow-hidden rounded-lg border border-slate-700">
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
          {rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? "bg-slate-900" : "bg-slate-950"}>
              <td className="px-4 py-3">
                <img src={row.image} alt={row.name} className="h-10 w-10 rounded-full object-cover" />
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/profile/${row.id}`}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

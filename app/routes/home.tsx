import { useState } from "react";
import { Loading } from "~/components/shared/Loading";
import { Table } from "~/components/Table";
import { useTableData } from "~/graphql/queries/getTableData";
import { ErrorMessage } from "~/components/shared/ErrorMessage";
import { Pagination } from "~/components/Pagination";

export function meta() {
  return [
    { title: "Rick and Morty Character Browser" },
    { name: "description", content: "A simple React Router app to browse Rick and Morty characters." },
  ];
}

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useTableData(page);

  const rows = data?.characters.results ?? [];
  const totalPages = data?.characters.info.pages ?? 1;

  if (loading && rows.length === 0) return (
    <div className="flex flex-col px-10 py-3 gap-4 pb-8">
      <Loading />
    </div>
  );

  if (error || rows.length === 0) {
    return ( <div className="flex flex-col px-10 py-3 gap-4 pb-8">
      <ErrorMessage message={error?.message ?? "Failed to load character data."} />
    </div>);
  }

  return (
    <div className="flex flex-col px-10 py-3 gap-4 pb-8 items-center">
      <Table rows={rows} />

      <Pagination totalPages={totalPages} pageNumber={page} setPage={setPage} />
    </div>
  );
}

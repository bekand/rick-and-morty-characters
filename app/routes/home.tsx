import { useEffect, useState } from "react";
import { Loading } from "~/components/shared/Loading";
import { Table } from "~/components/home/Table";
import { useTableData } from "~/graphql/queries/getTableData";
import { ErrorMessage } from "~/components/shared/ErrorMessage";
import { Pagination } from "~/components/home/Pagination";
import { Search } from "~/components/home/Search";
import { useSearchParams } from "react-router";

export function meta() {
  return [
    { title: "Rick and Morty Character Browser" },
    { name: "description", content: "A simple React Router app to browse Rick and Morty characters." },
  ];
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get("name");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const { data, loading, error } = useTableData(page, urlSearchTerm);
  const rows = data?.characters.results ?? [];
  const totalPages = data?.characters.info.pages ?? 1;

  const setPageParam = (page: number) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("page", page.toString());
      return nextParams;
    });
  };

  const setSearchTermParam = (term: string | null) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (term) {
        nextParams.set("name", term);
      } else {
        nextParams.delete("name");
      }
      nextParams.set("page", "1"); // Reset to first page when search term changes
      return nextParams;
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 px-10 py-3 pb-8">
      <div className="w-full self-start md:max-w-[50%]">
        <Search value={urlSearchTerm} onChange={setSearchTermParam} />
      </div>

      {loading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : error ? (
        <div className="w-full">
          <ErrorMessage message={error?.message ?? "Failed to load character data."} />
        </div>
      ) : (
        <>
          <Table rows={rows} />
          <Pagination totalPages={totalPages} pageNumber={page} setPage={setPageParam} />
        </>
      )}
    </div>
  );
}

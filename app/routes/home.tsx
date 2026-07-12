import { useEffect, useState } from "react";
import { Loading } from "~/components/shared/Loading";
import { Table } from "~/components/home/Table";
import { useTableData } from "~/graphql/queries/getTableData";
import { ErrorMessage } from "~/components/shared/ErrorMessage";
import { Pagination } from "~/components/home/Pagination";
import { Search } from "~/components/home/Search";
import { useSearchParams } from "react-router";
import { useSearch } from "~/hooks/search/useSearch";

export function meta() {
  return [
    { title: "Rick and Morty Character Browser" },
    { name: "description", content: "A simple React Router app to browse Rick and Morty characters." },
  ];
}

function getPageFromSearchParams(searchParams: URLSearchParams): number {
  const pageParam = searchParams.get("page");
  if (pageParam) {
    const parsedPage = parseInt(pageParam, 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      return parsedPage;
    }
  }
  return 1;
}


export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = getPageFromSearchParams(searchParams);
  const {inputValue, searchTerm, handleSearchChange} = useSearch({ field: "name" });

  const { data, loading, error } = searchTerm !== undefined 
    ? useTableData(page, { name: searchTerm })
    : useTableData(page);
  const rows = data?.characters.results ?? [];
  const totalPages = data?.characters.info.pages ?? 1;


  const setPageParam = (page: number) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("page", page.toString());
      return nextParams;
    }, { replace: true });
  };

  return (
    <main className="flex w-full flex-col gap-1 items-center px-10 py-3 pb-8">
      <div className="w-full self-start flex flex-col gap-2 md:flex-row md:max-w-[80%]">
        <Search value={inputValue ?? ""} onChange={handleSearchChange} />
      </div>

      {loading ? (
        <div className="w-full">
          <Loading message="Loading characters..." />
        </div>
      ) : error ? (
        <div className="w-full mt-10">
          <ErrorMessage message={error?.message ?? "Failed to load character data."} />
        </div>
      ) : (
        <>
          {page > totalPages ? (
            <div className="w-full mt-10">
              <ErrorMessage message={`Page ${page} does not exist. Total pages: ${totalPages}.`} />
            </div>
          ) : 
          <>
            <div aria-live="polite" className="w-full px-1 text-sm text-slate-400 text-right">
              Showing {rows.length} characters on page {page} of {totalPages}.
            </div>
            <Table rows={rows} />
            <Pagination totalPages={totalPages} pageNumber={page} setPage={setPageParam} />
          </>
          }
        </>
      )}
    </main>
  );
}

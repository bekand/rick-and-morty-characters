import { useEffect, useState } from "react";
import { Loading } from "~/components/shared/Loading";
import { Table } from "~/components/home/Table";
import { useTableData } from "~/graphql/queries/getTableData";
import { ErrorMessage } from "~/components/shared/ErrorMessage";
import { Pagination } from "~/components/home/Pagination";
import { Search } from "~/components/home/Search";
import { useSearchParams } from "react-router";
import { useDebounce } from "~/hooks/useDebounce";

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

function normalizeSearchTerm(rawSearchTerm: string | null): string | null {
  const nameParam = rawSearchTerm?.replace(/\s\s+/g, " ")?.slice(0, 50);
  if (nameParam) {
    return nameParam;
  }
  return null;
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchTerm = normalizeSearchTerm(searchParams.get("name"));
  const page = getPageFromSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const debounce = useDebounce();

  const { data, loading, error } = useTableData(page, searchTerm);
  const rows = data?.characters.results ?? [];
  const totalPages = data?.characters.info.pages ?? 1;

  // Sync local input when URL changes externally
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  const setPageParam = (page: number) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("page", page.toString());
      return nextParams;
    });
  };

  const setSearchTermParam = (rawTerm: string | null) => {
    const term = normalizeSearchTerm(rawTerm);
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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    debounce(() => {
      setSearchTermParam(term);
    }, 300);
  };

  return (
    <main className="flex w-full flex-col gap-1 items-center px-10 py-3 pb-8">
      <div className="w-full self-start md:max-w-[50%]">
        <Search value={searchTerm} onChange={handleSearchChange} />
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
          <div aria-live="polite" className="w-full px-1 text-sm text-slate-400 text-right">
            Showing {rows.length} characters on page {page} of {totalPages}.
          </div>
          <Table rows={rows} />
          <Pagination totalPages={totalPages} pageNumber={page} setPage={setPageParam} />
        </>
      )}
    </main>
  );
}

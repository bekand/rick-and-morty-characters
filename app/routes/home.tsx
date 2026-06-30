import { Loading } from "~/components/shared/Loading";
import { Table } from "~/components/Table";
import { useTableData } from "~/graphql/queries/getTableData";
import { ErrorMessage } from "~/components/shared/ErrorMessage";

export function meta() {
  return [
    { title: "Rick and Morty Character Browser" },
    { name: "description", content: "A simple React Router app to browse Rick and Morty characters." },
  ];
}

export default function Home() {
  const { data, loading, error } = useTableData(1);

  const rows = data?.characters?.results ?? [];

  if (loading) return <Loading />;

  if (error || rows.length === 0) {
    return <ErrorMessage message="Failed to load character data." />;
  }

  return <Table rows={rows} />;
}

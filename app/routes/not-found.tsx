import { BackToHomeLink } from "~/components/profile/BackToHomeLink";

export function meta() {
  return [
    { title: "404 Page Not Found" },
    { name: "description", content: "The page you requested does not exist." },
  ];
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-slate-100">404</h1>
      <BackToHomeLink />
    </main>
  );
}

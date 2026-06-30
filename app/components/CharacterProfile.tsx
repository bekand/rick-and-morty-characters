import type { Character } from "~/types/Character";
import { StatusPill } from "~/components/shared/StatusPill";

interface CharacterProfileProps {
  character: Character;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">
      <p className="text-sm font-medium uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-2 text-base text-slate-100">{value}</p>
    </div>
  );
}

export function CharacterProfile({ character }: CharacterProfileProps) {
  return (
    <div className="lg:max-w-[85%] lg:mx-auto p-4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col space-y-4">
          <div className="mb-1 flex items-start">
            <span className="text-xs text-slate-400">
              #{character.id}
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">{character.name}</h1>

          <div className="size-fit rounded-2xl border border-white/10 bg-slate-800/70 p-1">
            <img
              src={character.image}
              alt={character.name}
              height="200"
              width="200"
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1 justify-end">
          <div className="flex flex-wrap gap-2">
            Status:
            <StatusPill status={character.status} />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <DetailCard label="Origin" value={character.origin.name} />
            <DetailCard label="Species" value={`${character.species} ${character.type ? `(${character.type})` : ""}`} />
            <DetailCard label="Gender" value={character.gender} />
            <DetailCard label="Created" value={formatDate(character.created)} />
            <DetailCard label="First episode" value={character.episode[0]?.name ?? "Unknown"} />
            <DetailCard label="Current location" value={character.location.name} />
          </div>
        </div>

        <div className="w-full md:size-fit rounded-2xl border border-white/10 bg-slate-800/70 p-4 max-h-55 self-end">
          <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">Appearances</h3>
          <ul className="mt-3 max-h-35 space-y-2 overflow-y-auto pr-2">
            {character.episode.length > 0 ? (
              character.episode.map((episode) => (
                <li key={episode.name} className="text-sm text-slate-100">
                  {episode.episode} - {episode.name}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-400">No appearances recorded</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

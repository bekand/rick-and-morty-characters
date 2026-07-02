export function ErrorMessage({ message }: { message: string; }) {
	return (
		<div className="min-h-screen" role="alert" aria-live="assertive">
			<p className="flex items-center justify-center text-center text-xl font-semibold uppercase tracking-[0.2em] text-red-800">
				{message}
			</p>
		</div>
	);
}
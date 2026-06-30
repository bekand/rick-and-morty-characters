export function ErrorMessage({ message, children }: { message: string; children?: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			{children}
			<p className="flex items-center justify-center text-center text-xl font-semibold uppercase tracking-[0.2em] text-red-900">
				{message}
			</p>
		</div>
	);
}
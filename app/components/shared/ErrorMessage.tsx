interface ErrorMessageProps {
  message: string;
  retry?: () => void;
  retryLabel?: string;
}

export function ErrorMessage({ message, retry, retryLabel }: ErrorMessageProps) {
	return (
		<div className="min-h-screen" role="alert" aria-live="assertive">
			<p className="flex items-center justify-center text-center text-xl font-semibold uppercase tracking-[0.2em] text-red-800">
				{message}
			</p>
			{retry && retryLabel && (
				<div className="flex items-center justify-center mt-4">
					<button
						onClick={retry}
						className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
					>
						{retryLabel}
					</button>
				</div>
			)}
		</div>
	);
}
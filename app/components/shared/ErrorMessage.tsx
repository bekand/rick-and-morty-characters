import { useState } from "react";

interface RetryAction {
  retry: () => void;
  retryLabel?: string;
}

interface ErrorMessageProps {
  message: string;
  retryAction?: RetryAction;
}

export function ErrorMessage({ message, retryAction }: ErrorMessageProps) {
	const [hasRetried, setHasRetried] = useState(false);

	const handleRetry = () => {
		if (!retryAction || hasRetried) {
			return;
		}
		setHasRetried(true);
		retryAction.retry();
	};

	return (
		<div className="min-h-screen" role="alert" aria-live="assertive">
			<p className="flex items-center justify-center text-center text-xl font-semibold uppercase tracking-[0.2em] text-red-800">
				{message}
			</p>
			{retryAction && (
				<div className="flex items-center justify-center mt-4">
					<button
						onClick={handleRetry}
						disabled={hasRetried}
						className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{retryAction.retryLabel ?? "Retry"}
					</button>
				</div>
			)}
		</div>
	);
}
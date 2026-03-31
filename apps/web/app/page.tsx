"use client";

import { useEffect, useState } from "react";

export default function Home() {
	const [apiStatus, setApiStatus] = useState<"checking" | "ok" | "error">(
		"checking",
	);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const checkApi = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/health`,
				);
				if (response.ok) {
					const data = await response.json();
					setApiStatus("ok");
					setMessage(`API is running! ${JSON.stringify(data)}`);
				} else {
					setApiStatus("error");
					setMessage("API responded with error");
				}
			} catch (error) {
				setApiStatus("error");
				setMessage(`Could not connect to API: ${error}`);
			}
		};

		checkApi();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-4">
			<div className="w-full max-w-2xl">
				<h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
					eikiei CRM ХУЙ
				</h1>

				<div className="w-full p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 mb-6">
					<h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
						API Status
					</h2>
					<div className="flex items-center gap-3">
						<div
							className={`w-4 h-4 rounded-full transition-colors ${
								apiStatus === "ok"
									? "bg-green-500"
									: apiStatus === "error"
										? "bg-red-500"
										: "bg-yellow-500"
							}`}
						/>
						<span
							className={`font-medium transition-colors ${
								apiStatus === "ok"
									? "text-green-600 dark:text-green-400"
									: apiStatus === "error"
										? "text-red-600 dark:text-red-400"
										: "text-yellow-600 dark:text-yellow-400"
							}`}
						>
							{apiStatus === "checking"
								? "Checking..."
								: apiStatus === "ok"
									? "Connected"
									: "Disconnected"}
						</span>
					</div>
					{message && (
						<p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 break-all">
							{message}
						</p>
					)}
				</div>

				<div className="w-full p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
					<h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
						Getting Started
					</h2>
					<ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
						<li className="flex items-start gap-2">
							<span className="text-blue-500 mt-1">•</span>
							<span>Frontend: Next.js 16+ with React 19</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 mt-1">•</span>
							<span>Backend: Fastify API</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 mt-1">•</span>
							<span>Styling: Tailwind CSS v3</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 mt-1">•</span>
							<span>Database: PostgreSQL (via Docker)</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 mt-1">•</span>
							<span>Cache: Redis (via Docker)</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 mt-1">•</span>
							<span>Hot-reload: Enabled for dev</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

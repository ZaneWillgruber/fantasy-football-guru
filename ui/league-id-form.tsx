"use client";
import { useState } from "react";

export default function LeagueIdForm({ onSubmit }) {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(inputValue);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
			<h1 className="mb-4 text-3xl font-bold">
				Enter Sleeper League ID
			</h1>
			<form className="w-full max-w-sm" onSubmit={handleSubmit}>
				<div className="flex items-center rounded-lg border-2 border-gray-700 bg-gray-800 p-1 focus-within:border-blue-500">
					<input
						type="text"
						id="leagueID"
						className="w-full appearance-none bg-transparent px-4 py-2 leading-tight text-gray-200 placeholder-gray-500 focus:outline-none"
						placeholder="Enter League ID..."
						aria-label="Sleeper League ID"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button
						type="submit"
						className="rounded-md bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						aria-label="Submit League ID"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
}

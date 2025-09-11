"use client"

import { resetCookies } from "@/actions/cookies";
import { useEffect, useState } from "react";
import { LeagueData } from "@/types/league";
import { UserData } from "@/types/user";
import UsersDisplay from "@/components/users/users-display";
import { FaTrophy, FaRedo } from 'react-icons/fa'; // Added icons for visual flair

interface HomePageProps {
	leagueID: string;
}

export default function HomePage({ leagueID }: HomePageProps) {
	const [league, setLeague] = useState<LeagueData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!leagueID) return;
		const fetchLeagueData = async () => {
			setLoading(true);
			setError(null);
			try {
				const [leagueResponse, usersResponse] = await Promise.all([
					fetch(`https://api.sleeper.app/v1/league/${leagueID}`),
					fetch(`https://api.sleeper.app/v1/league/${leagueID}/users`)
				]);

				if (!leagueResponse.ok) {
					throw new Error("League not found. Please check the ID.");
				}
				if (!usersResponse.ok) {
					throw new Error("Could not fetch users for the league.");
				}

				const leagueData: LeagueData = await leagueResponse.json();
				const usersData: UserData[] = await usersResponse.json();
				leagueData.users = usersData;

				setLeague(leagueData);
			}
			catch (err: any) {
				setError(err.message || "An unexpected error occurred.");
			}
			finally {
				setLoading(false);
			}
		}

		fetchLeagueData();
	}, [leagueID]); // Added leagueID to dependency array for correctness

	const handleChangeLeague = async () => {
		await resetCookies();
		window.location.reload();
	}

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-900 text-gray-400">
				<p className="text-xl animate-pulse">Loading League Data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-4">
				<p className="mb-6 text-2xl text-red-500 font-bold text-center">
					<span role="img" aria-label="error">
						⚠️
					</span>{" "}
					Error: {error}
				</p>
				<button
					onClick={handleChangeLeague}
					className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<FaRedo />
					<span>Try a Different League ID</span>
				</button>
			</div>
		);
	}

	if (!league) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-900 text-gray-400">
				<p>Could not set league</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8">
			<div className="flex items-center space-x-4 mb-8">
				<h1 className="text-5xl md:text-6xl font-extrabold text-center">
					{league.name}
				</h1>
			</div>
			<UsersDisplay users={league.users} />
			<div className="mt-8">
				<button
					onClick={handleChangeLeague}
					className="flex items-center space-x-2 rounded-lg bg-gray-700 px-4 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				>
					<FaRedo />
					<span>Change League</span>
				</button>
			</div>
		</div>
	);
}

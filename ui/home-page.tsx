"use client"

import { resetCookies } from "@/actions/cookies";
import { useEffect, useState } from "react";
import { LeagueData } from "@/types/league";
import { UserData } from "@/types/user";
import UsersDisplay from "@/components/users/users-display";

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
				setError(err.message || "An unexpected error occured.");
			}
			finally {
				setLoading(false);
			}
		}

		fetchLeagueData();
	}, [])

	const handleChangeLeague = async () => {
		await resetCookies();
		window.location.reload();
	}

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
				<p>Loading League Data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
				<p className="mb-4 text-xl text-red-500">Error: {error}</p>
				<button
					onClick={handleChangeLeague}
					className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Try a Different League ID
				</button>
			</div>
		);
	}

	if (!league) {
		return (
			<div>
				Could not set league
			</div>
		)
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
			<p>League: {league.name}</p>
			<p>{league.users.length} Users</p>
			<UsersDisplay users={league.users} />
		</div>
	);
}

"use client";
import { useLeagueID } from "@/hooks/use-league-id";
import HomePage from "@/ui/home-page";
import LeagueIdForm from "@/ui/league-id-form";

export default function Home() {
	const { leagueID, loading, error, saveLeagueID } = useLeagueID();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	if (leagueID) {
		return <HomePage leagueID={leagueID} />;
	}

	return (
		<LeagueIdForm onSubmit={saveLeagueID} />
	);
}

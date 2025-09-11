"use client";
import { useLeagueID } from "@/hooks/use-league-id";
import SelectionPage from "@/ui/selection-page";
import LeagueIdForm from "@/ui/league-id-form";
import HomePage from "@/ui/home-page";

export default function Home() {
	const { leagueID, userID, loading, error, saveLeagueID, saveUserID } = useLeagueID();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	if (leagueID && userID) {
		return <HomePage leagueID={leagueID} userID={userID} />
	}

	if (leagueID) {
		return <SelectionPage leagueID={leagueID} onClick={saveUserID} />;
	}

	return (
		<LeagueIdForm onSubmit={saveLeagueID} />
	);
}

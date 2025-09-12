import SelectionPage from "@/ui/selection-page";
import LeagueIdForm from "@/ui/league-id-form";
import HomePage from "@/ui/home-page";
import { cookies } from "next/headers";
import { setCookie } from "@/actions/cookies";
import ResetPage from "./reset/page";

export default async function Home() {
	const cookieStore = await cookies();
	const leagueID = cookieStore.get("leagueID");
	const userID = cookieStore.get("userID");

	if (leagueID && userID) {
		return (
			<div>
				<ResetPage />
				<HomePage leagueID={leagueID.value} userID={userID.value} />
			</div>
		)
	}

	if (leagueID) {
		return <SelectionPage leagueID={leagueID.value} onClick={setCookie} />;
	}

	return (
		<LeagueIdForm onSubmit={setCookie} />
	);
}

import { getMyRoster } from "@/functions/get-my-roster";
import { useEffect, useState } from "react";

interface HomePageProps {
	leagueID: string;
	userID: string;
}

export default function HomePage({ leagueID, userID }: HomePageProps) {
	const [roster, setRoster] = useState("");

	useEffect(() => {
		const fetchRosterData = async () => {
			const rosterData = await getMyRoster(leagueID, userID);
			if (rosterData) {
				setRoster(rosterData)
			}
		}

		fetchRosterData();
	}, []);

	console.log(roster);
	return (
		<div>
			<p>{leagueID}</p>
			<p>{userID}</p>
			<p>{roster}</p>
		</div>
	)
}

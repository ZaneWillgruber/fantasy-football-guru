"use server"
import { RosterData } from "@/types/roster";
import { getPlayerInfo } from "./get-player-info";

export async function getRoster(leagueID: string, userID: string) {
	try {
		const res = await fetch(`https://api.sleeper.app/v1/league/${leagueID}/rosters`)
		if (!res.ok) {
			throw new Error("League not found. Please check the ID.");
		}

		const allRosters: RosterData[] = await res.json();
		const myRoster: RosterData | undefined = allRosters.find(roster => roster.owner_id === userID);

		if (!myRoster) {
			throw new Error("Could not find roster");
		}

		return myRoster
	}
	catch (err) {

	}
}


async function buildRosterString(data: RosterData) {
	let str = "Players:\n";

	for (const player of data.players) {
		str += ` - ${await getPlayerInfo(player)}\n`;
	}

	str += "\nStarters:\n";

	for (const starter of data.starters) {
		str += ` - ${starter}\n`;
	}

	return str;
}

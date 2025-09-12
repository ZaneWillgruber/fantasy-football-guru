import { LeagueData } from "@/types/league";
import { UserData } from "@/types/user";
import { getRoster } from "./get-roster";
import { PlayerData } from "@/types/player";
import { getPlayerInfo } from "./get-player-info";

export async function getLeagueInfo(leagueID: string) {
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

		for (const user of leagueData.users) {
			user.roster = await getRoster(leagueID, user.user_id);
			let players_data: PlayerData[] = [];
			for (const playerID of user.roster!.players) {
				players_data.push(await getPlayerInfo(playerID));
			}
			user.roster!.players_data = players_data;
		}


		return leagueData;
	}
	catch (err) {
		console.error(err);
	}
}

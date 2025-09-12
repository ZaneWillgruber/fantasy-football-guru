import { PlayerData } from "@/types/player";

let allPlayersCache: Record<string, PlayerData> | null = null;

async function getAllPlayers() {
	if (!allPlayersCache) {
		try {
			console.log("getting all players from api");
			const res = await fetch("https://api.sleeper.app/v1/players/nfl/", {
				next: { revalidate: 3600 }
			});

			if (!res.ok) {
				throw new Error("Failed to fetch players");
			}

			allPlayersCache = await res.json();
		}
		catch (err) {
			console.error(err);
			return {};
		}
	}

	return allPlayersCache;
}

export async function getPlayerInfo(playerID: string) {
	try {
		const allPlayers = await getAllPlayers();

		if (allPlayers && allPlayers[playerID]) {
			const myPlayer: PlayerData = allPlayers[playerID];
			return myPlayer;
		}

		return `Error: player info not found`;
	}
	catch (err) {
		return `Error: ${err}`;
	}
}

function stringifyInfo(player: PlayerData): string {
	return `Fullname: ${player.first_name} ${player.last_name}\nPosition: ${player.position}`
}

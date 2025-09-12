import { PlayerData } from "./player";

export interface RosterData {
	owner_id: string;
	roster_id: string;
	players: string[];
	players_data: PlayerData[];
	starters: string[];
}

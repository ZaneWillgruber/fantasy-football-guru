import { RosterData } from "./roster";

export interface UserData {
	user_id: string;
	avatar: string;
	display_name: string;
	metadata: {
		team_name: string;
		avatar: string;
	};
	roster: RosterData | undefined
}

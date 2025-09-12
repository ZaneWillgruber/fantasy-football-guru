import { UserData } from "@/types/user";

export function getPlayersRoster(user: UserData): string {
	// 1. Handle cases where the roster is empty or doesn't exist.
	if (!user.roster?.players_data || user.roster.players_data.length === 0) {
		return `## ${user.display_name}'s Roster\n\nThis user has no players.`;
	}

	// 2. Group players by their position.
	const playersByPosition = user.roster.players_data.reduce((acc, player) => {
		const position = player.position || 'Unknown';
		if (!acc[position]) {
			acc[position] = [];
		}
		// Add more useful info, like the player's team, if available.
		const playerIdentifier = `${player.first_name} ${player.last_name}${player.team ? ` (${player.team})` : ''}`;
		acc[position].push(playerIdentifier);
		return acc;
	}, {} as Record<string, string[]>);

	// 3. Build the final Markdown string.
	let rosterString = `## ${user.display_name}'s Roster\n`;
	rosterString += `----\n`;

	// Optional: Define a logical sort order for positions.
	const positionOrder = ["QB", "RB", "WR", "TE", "FLEX", "K", "DEF", "BN"];

	const sortedPositions = Object.keys(playersByPosition).sort((a, b) => {
		const indexA = positionOrder.indexOf(a);
		const indexB = positionOrder.indexOf(b);
		if (indexA > -1 && indexB > -1) return indexA - indexB;
		if (indexA > -1) return -1; // Keep ordered positions first
		if (indexB > -1) return 1;
		return a.localeCompare(b); // Alphabetize any other positions
	});

	for (const position of sortedPositions) {
		rosterString += `### ${position}\n`; // Position as a subheading
		rosterString += playersByPosition[position].map(p => `- ${p}`).join('\n');
		rosterString += `\n\n`;
	}

	return rosterString.trim();
}

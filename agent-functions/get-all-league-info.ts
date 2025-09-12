import { LeagueData } from "@/types/league";

const scoringKeyMap: { [key: string]: string } = {
	// passing
	pass_yd: "Passing Yards",
	pass_td: "Passing TD",
	pass_int: "Interception Thrown",
	pass_2pt: "Passing 2-Point Conversion",
	bonus_pass_yd_300: "300+ Passing Yard Bonus",
	bonus_pass_yd_400: "400+ Passing Yard Bonus",
	pass_sack: "Times Sacked",
	// rushing
	rush_yd: "Rushing Yards",
	rush_td: "Rushing TD",
	rush_2pt: "Rushing 2-Point Conversion",
	bonus_rush_yd_100: "100+ Rushing Yard Bonus",
	bonus_rush_yd_200: "200+ Rushing Yard Bonus",
	// receiving
	rec: "Reception",
	rec_yd: "Receiving Yards",
	rec_td: "Receiving TD",
	rec_2pt: "Receiving 2-Point Conversion",
	bonus_rec_yd_100: "100+ Receiving Yard Bonus",
	bonus_rec_yd_200: "200+ Receiving Yard Bonus",
	bonus_rec_te: "TE Reception Bonus",
	// kicking
	fgm: "Field Goal Made",
	xpm: "Extra Point Made",
	fgmiss: "Field Goal Missed",
	xpmiss: "Extra Point Missed",
	fgm_0_19: "FG Made (0-19 yards)",
	fgm_20_29: "FG Made (20-29 yards)",
	fgm_30_39: "FG Made (30-39 yards)",
	fgm_40_49: "FG Made (40-49 yards)",
	fgm_50p: "FG Made (50+ yards)",
	// defense & Special Teams
	sack: "Sack",
	int: "Interception",
	fum_rec: "Fumble Recovery",
	def_td: "Defensive TD",
	st_td: "Special Teams TD",
	safe: "Safety",
	blk_kick: "Blocked Kick",
	pts_allow_0: "Points Allowed: 0",
	pts_allow_1_6: "Points Allowed: 1-6",
	pts_allow_7_13: "Points Allowed: 7-13",
	// individual Defensive Player (IDP)
	idp_sack: "IDP Sack",
	idp_int: "IDP Interception",
	idp_tkl_solo: "IDP Solo Tackle",
	idp_tkl_ast: "IDP Assisted Tackle",
	idp_ff: "IDP Forced Fumble",
	// miscellaneous
	fum_lost: "Fumble Lost",
	ff: "Forced Fumble",
};

export function getAllLeagueInfo(league: LeagueData): string {
	let result = `Here is a summary of the fantasy football league "${league.name}":\n\n`;

	// league Overview
	result += `## League Overview\n`;
	result += `- **League Name:** ${league.name}\n`;
	result += `- **Sport:** ${league.sport}\n`;
	result += `- **Number of Teams:** ${league.total_rosters}\n`;
	result += `- **Season:** ${league.season}\n`;
	result += `- **Status:** ${league.status}\n\n`;
	result += `----\n`;

	// roster & key settings
	result += `## Roster and Rules\n`;
	result += `- **Roster Positions:** ${league.roster_positions.join(', ')}\n`;
	result += `- **Playoff Teams:** ${league.settings.playoff_teams}\n`;
	result += `- **Best Ball Format:** ${league.settings.best_ball === 1 ? 'Yes' : 'No'}\n`;
	result += `- **Waiver Type Code:** ${league.settings.waiver_type} (e.g., 2 may indicate FAAB)\n`;
	if (league.settings.waiver_budget > 0) {
		result += `- **Waiver Budget:** $${league.settings.waiver_budget}\n`;
	}
	result += `- **Trade Deadline:** Week ${league.settings.trade_deadline}\n`;
	result += `- **Max Keepers:** ${league.settings.max_keepers}\n\n`;
	result += `----\n`;

	// scoring settings
	result += `## Scoring Settings\n`;
	const activeScoringRules = Object.entries(league.scoring_settings)
		.filter(([_, value]) => value !== 0 && value !== null);

	if (activeScoringRules.length === 0) {
		result += `Standard scoring settings are used.\n\n`;
	} else {
		result += `Only custom or non-zero scoring values are listed:\n`;
		for (const [key, value] of activeScoringRules) {
			const readableKey = scoringKeyMap[key] || key.replace(/_/g, ' ');
			result += `- **${readableKey}:** ${value}\n`;
		}
		result += `\n`;
	}
	result += `----\n`;

	// league members
	result += `## League Members\n`;
	const userNames = league.users.map(user => user.display_name).join(', ');
	result += `${userNames}\n`;

	return result;
}

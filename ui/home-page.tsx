import { getAllLeagueInfo } from "@/agent-functions/get-all-league-info";
import { getPlayersRoster } from "@/agent-functions/get-players-roster";
import { getLeagueInfo } from "@/functions/get-league-info";
import { LeagueData } from "@/types/league";
import { UserData } from "@/types/user";
import { GoogleGenAI } from "@google/genai";
import { Content } from "@google/genai/node";

interface HomePageProps {
	leagueID: string;
	userID: string;
}

export default async function HomePage({ leagueID, userID }: HomePageProps) {
	const league: LeagueData | undefined = await getLeagueInfo(leagueID);
	const users: UserData[] = league!.users

	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	const messages: Content[] = [
		{
			role: "user",
			parts: [{ text: `who should I start in fantasy. Here are the League Settings:\n${getAllLeagueInfo(league)}\n\nHere is my roster:\n${getPlayersRoster(users.find(user => user.display_name == "ZaneWillgruber"))}` }],
		}
	]

	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash-001",
		contents: messages,
	});

	return (
		<div>

			<p>{leagueID}</p>
			<p>{userID}</p>
			<br />
			{/* {users.map(user => ( */}
			{/* 	<div key={user.user_id}> */}
			{/* 		{user.display_name}'s Roster */}
			{/* 		{user.roster!.players_data.map(player => ( */}
			{/* 			<p key={player.player_id}>{player.position}: {player.first_name} {player.last_name}</p> */}
			{/* 		))} */}
			{/* 		<br /> */}
			{/* 	</div> */}
			{/* ))} */}
			{/* <br /> */}
			{/* <br /> */}
			{/* <br /> */}
			<p>{response.text}</p>
		</div>
	)
}

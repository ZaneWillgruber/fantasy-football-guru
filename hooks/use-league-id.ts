import { getCookie, setCookie } from "@/actions/cookies";
import { useEffect, useState } from "react";

export function useLeagueID() {
	const [leagueID, setLeagueID] = useState<string | null>(null);
	const [userID, setUserID] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCookie = async () => {
			try {
				const leagueValue = await getCookie("leagueID");
				const userValue = await getCookie("userID");
				if (leagueValue) {
					setLeagueID(leagueValue.value);
				}
				if (userValue) {
					setUserID(userValue.value);
				}
			} catch (err) {
				console.error("Failed to fetch cookie:", err);
				setError("Could not load your settings. Please try refreshing the page.");
			} finally {
				setLoading(false);
			}
		};

		fetchCookie();
	}, []);

	const saveLeagueID = async (id: string) => {
		const trimmedId = id.trim();
		if (!trimmedId) return;

		try {
			await setCookie("leagueID", trimmedId);
			setLeagueID(trimmedId);
		} catch (err) {
			console.error("Failed to set cookie:", err);
			setError("Could not save your League ID. Please try again.");
		}
	};

	const saveUserID = async (id: string) => {
		const trimmedId = id.trim();
		if (!trimmedId) return;

		try {
			await setCookie("userID", trimmedId);
			setUserID(trimmedId);
		}
		catch (err) {
			console.error("Failed to set cookie:", err);
			setError("Could not save your User ID. Please try again.");
		}
	}

	return { leagueID, userID, loading, error, saveLeagueID, saveUserID };
}

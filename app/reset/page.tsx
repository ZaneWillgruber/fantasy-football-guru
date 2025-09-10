import { resetCookies } from "@/actions/cookies"

export default function ResetPage() {

	return (
		<div>
			<form action={resetCookies}>
				<button type="submit">Click to reset cookies</button>
			</form>
		</div>
	)
}

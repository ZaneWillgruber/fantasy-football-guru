import { UserData } from "@/types/user";
import UserCard from "./user";

interface UsersDisplayProps {
	users: UserData[]
}

export default function UsersDisplay({ users }: UsersDisplayProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{users.map((user, index) => (
				<UserCard user={user} />
			))}
		</div>
	)
}

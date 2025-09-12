import { UserData } from "@/types/user";
import UserCard from "./user";

interface UsersDisplayProps {
	users: UserData[]
	onClick: (key: string, id: string) => Promise<void>;
}

export default function UsersDisplay({ users, onClick }: UsersDisplayProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
			{users.map((user) => (
				<UserCard key={user.user_id} user={user} onClick={onClick} />
			))}
		</div>
	)
}

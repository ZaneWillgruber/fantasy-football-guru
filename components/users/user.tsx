import { UserData } from "@/types/user";

interface UserCardProps {
	user: UserData;
}

export default function UserCard({ user }: UserCardProps) {
	const avatarURL = user.metadata?.avatar || `https://sleepercdn.com/avatars/${user.avatar}`;

	return (
		<div className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
			<img
				className="w-20 h-20 mb-3 rounded-full object-cover shadow-lg"
				src={avatarURL}
				alt={`${user.display_name}'s avatar`}
			/>
			<p className="text-lg font-semibold text-gray-800">
				{user.display_name}
			</p>
		</div>
	)
}

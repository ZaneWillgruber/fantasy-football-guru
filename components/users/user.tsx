import { UserData } from "@/types/user";

interface UserCardProps {
	user: UserData;
	onClick: (key: string, id: string) => Promise<void>;
}


export default function UserCard({ user, onClick }: UserCardProps) {
	const avatarURL = user.metadata?.avatar || `https://sleepercdn.com/avatars/${user.avatar}`;

	return (
		<div
			onClick={() => onClick("userID", user.user_id)}
			className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
			<div className="p-6 text-center">
				<img
					className="w-24 h-24 mb-4 rounded-full mx-auto object-cover border-4 border-indigo-500 shadow-md"
					src={avatarURL}
					alt={`${user.display_name}'s avatar`}
				/>
				<h3 className="text-xl font-bold text-gray-100 mb-1">
					{user.display_name}
				</h3>
				{user.metadata?.team_name && (
					<p className="text-sm text-gray-400 italic">
						{user.metadata.team_name}
					</p>
				)}
			</div>
		</div>
	)
}

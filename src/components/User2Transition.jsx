import { Film } from "lucide-react";

export default function User2Transition({
  user1LikesCount,
  onContinue,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <Film className="w-24 h-24 mx-auto text-white animate-pulse" />
          <h1 className="text-5xl font-bold text-white">User 1 Done! ✅</h1>
          <p className="text-xl text-pink-200">User 2, it's your turn!</p>
          <p className="text-lg text-pink-300">
            User 1 liked {user1LikesCount} show
            {user1LikesCount !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-64 bg-white text-purple-900 py-4 px-8 rounded-full text-xl font-bold hover:bg-pink-100 transition-all transform hover:scale-105 shadow-2xl"
        >
          User 2 Start Swiping
        </button>
      </div>
    </div>
  );
}

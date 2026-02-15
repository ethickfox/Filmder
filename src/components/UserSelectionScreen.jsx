import { Film } from "lucide-react";

export default function UserSelectionScreen({
  movies,
  selectedGenres,
  fromYear,
  tillYear,
  onStartSession,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <Film className="w-24 h-24 mx-auto text-white" />
          <h1 className="text-6xl font-bold text-white">Filmder</h1>
          <p className="text-xl text-pink-200">
            Swipe. Match. Watch Together.
          </p>
          <p className="text-sm text-pink-300">
            {movies.length} shows loaded
          </p>
          <p className="text-sm text-pink-300">
            Release period: {fromYear} − {tillYear}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onStartSession(1)}
            className="w-64 bg-white text-purple-900 py-4 px-8 rounded-full text-xl font-bold hover:bg-pink-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            User 1 Start
          </button>
          <p className="text-pink-200 text-sm">
            First person swipes through all shows
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-pink-200 text-sm space-y-2">
            <p>
              <span className="font-semibold">Genres:</span>{" "}
              {selectedGenres.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Shows:</span> {movies.length}
            </p>
            <p>
              <span className="font-semibold">Period:</span> {fromYear} −{" "}
              {tillYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

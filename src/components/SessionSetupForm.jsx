import { Film } from "lucide-react";
import { genresMap } from "../utils/api";

export default function SessionSetupForm({
  fromYear,
  setFromYear,
  tillYear,
  setTillYear,
  selectedGenres,
  setSelectedGenres,
  showCount,
  setShowCount,
  onStartSession,
  loading,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <Film className="w-24 h-24 mx-auto text-white" />
          <h1 className="text-6xl font-bold text-white">Filmder</h1>
          <p className="text-xl text-pink-200">Swipe. Match. Watch Together.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6 w-full max-w-lg">
          {/* Year Range Selection */}
          <div className="space-y-4">
            <label className="block text-white text-lg font-semibold">
              Choose film release period
            </label>

            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                value={fromYear}
                onChange={(e) => setFromYear(Number(e.target.value))}
                className="bg-white text-purple-900 rounded-lg px-4 py-2 w-24 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                min="1900"
                max={tillYear}
              />{" "}
              -
              <input
                type="number"
                value={tillYear}
                onChange={(e) => setTillYear(Number(e.target.value))}
                className="bg-white text-purple-900 rounded-lg px-4 py-2 w-24 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                min={fromYear}
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          {/* Genre Selection */}
          <div className="space-y-4">
            <label className="block text-white text-lg font-semibold">
              Select genres
            </label>
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.keys(genresMap).map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setSelectedGenres((prev) =>
                      prev.includes(genre)
                        ? prev.filter((g) => g !== genre)
                        : [...prev, genre],
                    );
                  }}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-white text-purple-900 shadow-lg"
                      : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Show Count Selection */}
          <div className="space-y-4">
            <label className="block text-white text-lg font-semibold">
              Number of shows ({showCount})
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="flex justify-between text-white text-sm">
              <span>5</span>
              <span>100</span>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onStartSession}
            disabled={loading}
            className={`w-full py-4 px-8 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-2xl ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-white text-purple-900 hover:bg-pink-100"
            }`}
          >
            {loading ? "Loading..." : "Start Session"}
          </button>

          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-white text-sm font-medium">
              {fromYear} − {tillYear} •{" "}
              {selectedGenres.length === 0
                ? "Any genre "
                : `${selectedGenres.length} genre${selectedGenres.length !== 1 ? "s" : ""} `}
              • {showCount} shows
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

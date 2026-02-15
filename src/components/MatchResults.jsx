import { RotateCcw } from "lucide-react";

export default function MatchResults({ matches, onRestart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎉 It's a Match! 🎉
          </h1>
          <p className="text-xl text-pink-200">
            {matches.length > 0
              ? `You both liked ${matches.length} show${matches.length > 1 ? "s" : ""}!`
              : "No matches found. You have very different tastes! 😅"}
          </p>
        </div>

        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {matches.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all"
              >
                <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                  {movie.imageUrl ? (
                    <>
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.querySelector(
                            ".emoji-fallback",
                          ).style.display = "flex";
                        }}
                      />
                      <div className="absolute top-2 right-2 text-3xl bg-black/40 rounded-full p-1">
                        {movie.image}
                      </div>
                    </>
                  ) : (
                    <div className="emoji-fallback text-6xl">
                      {movie.image}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-900 mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {movie.year} • {movie.genre}
                    </p>
                    <p className="text-sm text-gray-700">{movie.description}</p>
                  </div>
                  {movie.imdbId && (
                    <a
                      href={`https://www.imdb.com/title/${movie.imdbId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-yellow-500 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all text-center text-sm"
                    >
                      View on IMDb
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 text-center">
            <p className="text-white text-lg">
              Maybe try again? Sometimes opposites attract... but not with
              shows apparently! 🎬
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onRestart}
            className="bg-white text-purple-900 py-4 px-8 rounded-full text-lg font-bold hover:bg-pink-100 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}

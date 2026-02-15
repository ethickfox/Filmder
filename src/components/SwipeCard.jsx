import { Heart, X } from "lucide-react";

export default function SwipeCard({
  currentMovie,
  swipeDirection,
  onSwipe,
  currentMovies,
  movies,
  currentUser,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            User {currentUser} Swiping
          </h2>
          <p className="text-pink-200">
            {currentMovies.length} show{currentMovies.length !== 1 ? "s" : ""}{" "}
            remaining
          </p>
        </div>

        {currentMovie ? (
          <div className="relative mb-8">
            <div
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
                swipeDirection === "right"
                  ? "transform translate-x-32 rotate-12 opacity-0"
                  : swipeDirection === "left"
                    ? "transform -translate-x-32 -rotate-12 opacity-0"
                    : ""
              }`}
            >
              {swipeDirection === "right" && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-10">
                  <Heart className="w-32 h-32 text-green-500" strokeWidth={3} />
                </div>
              )}
              {swipeDirection === "left" && (
                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10">
                  <X className="w-32 h-32 text-red-500" strokeWidth={3} />
                </div>
              )}

              <div className="p-8">
                <div className="relative w-full mb-6 flex justify-center">
                  {currentMovie.imageUrl ? (
                    <div className="relative">
                      <img
                        src={currentMovie.imageUrl}
                        alt={currentMovie.title}
                        className="h-80 object-cover rounded-lg shadow-lg"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                      <div className="absolute top-2 right-2 text-5xl bg-black/40 rounded-full p-2">
                        {currentMovie.image}
                      </div>
                    </div>
                  ) : (
                    <div className="text-8xl text-center">
                      {currentMovie.image}
                    </div>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-purple-900 mb-3 text-center">
                  {currentMovie.title}
                </h3>
                <p className="text-center text-gray-600 mb-4 text-lg">
                  {currentMovie.year} • {currentMovie.genre}
                </p>
                <p className="text-gray-700 text-center text-lg leading-relaxed">
                  {currentMovie.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8 text-center">
            <p className="text-white text-xl">All done! 🎬</p>
          </div>
        )}

        {currentMovie && (
          <div className="flex justify-center gap-6">
            <button
              onClick={() => onSwipe(false)}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95"
              disabled={swipeDirection !== null}
            >
              <X className="w-10 h-10 text-red-500" strokeWidth={3} />
            </button>
            <button
              onClick={() => onSwipe(true)}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95"
              disabled={swipeDirection !== null}
            >
              <Heart className="w-10 h-10 text-green-500" strokeWidth={3} />
            </button>
          </div>
        )}

        <div className="mt-8">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{
                width: `${
                  ((movies.length - currentMovies.length) / movies.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

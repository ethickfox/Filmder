import { useState, useEffect } from "react";
import { Heart, X, RotateCcw, Film, Loader } from "lucide-react";

const genreEmojis = {
  Action: "💥",
  Romance: "💘",
  Horror: "⚡",
  Drama: "🎭",
  Fantasy: "🐉",
  Comedy: "😂",
  "Sci-Fi": "🤖",
  Thriller: "🎯",
  Adventure: "🗻",
  Crime: "🔫",
  Documentary: "📹",
  Animation: "🎨",
};

const fetchNetflixMovies = async () => {
  try {
    const response = await fetch("https://api.tvmaze.com/shows?page=0");

    if (!response.ok) {
      throw new Error("Failed to fetch from TVMaze");
    }

    const shows = await response.json();

    const movies = shows.slice(0, 20).map((show) => {
      const genres = show.genres.length > 0 ? show.genres[0] : "Drama";
      const emoji = genreEmojis[genres] || "📺";

      return {
        id: show.id,
        title: show.name,
        year: show.premiered
          ? new Date(show.premiered).getFullYear()
          : "N/A",
        genre: genres,
        image: emoji,
        description: show.summary
          ? show.summary.replace(/<[^>]*>/g, "").substring(0, 200)
          : "An interesting show worth watching",
      };
    });

    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export default function MovieMatcher() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [user1Likes, setUser1Likes] = useState([]);
  const [user2Likes, setUser2Likes] = useState([]);
  const [user1Swiped, setUser1Swiped] = useState([]);
  const [user2Swiped, setUser2Swiped] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showMatches, setShowMatches] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showUser2Transition, setShowUser2Transition] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const netflixMovies = await fetchNetflixMovies();
      setMovies(netflixMovies);
      setLoading(false);
    };
    loadMovies();
  }, []);

  const currentMovies =
    currentUser === 1
      ? movies.filter((m) => !user1Swiped.includes(m.id))
      : movies.filter((m) => !user2Swiped.includes(m.id));

  const handleSwipe = (liked) => {
    const movie = currentMovies[0];
    if (!movie) return;

    setSwipeDirection(liked ? "right" : "left");

    setTimeout(() => {
      if (currentUser === 1) {
        setUser1Swiped([...user1Swiped, movie.id]);
        if (liked) {
          setUser1Likes([...user1Likes, movie.id]);
        }
      } else {
        setUser2Swiped([...user2Swiped, movie.id]);
        if (liked) {
          setUser2Likes([...user2Likes, movie.id]);
        }
      }

      setSwipeDirection(null);

      if (currentMovies.length === 1) {
        if (currentUser === 1) {
          setShowUser2Transition(true);
        } else {
          setSessionComplete(true);
          setShowMatches(true);
        }
      }
    }, 300);
  };

  const startSession = (userNumber) => {
    setCurrentUser(userNumber);
    setCurrentMovieIndex(0);
  };

  const restartApp = () => {
    setCurrentUser(null);
    setUser1Likes([]);
    setUser2Likes([]);
    setUser1Swiped([]);
    setUser2Swiped([]);
    setCurrentMovieIndex(0);
    setShowMatches(false);
    setSessionComplete(false);
    setSwipeDirection(null);
    setShowUser2Transition(false);
  };

  const matches = movies.filter(
    (movie) => user1Likes.includes(movie.id) && user2Likes.includes(movie.id)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Loader className="w-16 h-16 mx-auto text-white animate-spin" />
          <h2 className="text-2xl font-bold text-white">
            Loading Netflix Movies...
          </h2>
          <p className="text-pink-200">Getting the latest releases for you</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Film className="w-24 h-24 mx-auto text-white" />
            <h1 className="text-6xl font-bold text-white">MovieMatch</h1>
            <p className="text-xl text-pink-200">
              Swipe. Match. Watch Together.
            </p>
            <p className="text-sm text-pink-300">
              {movies.length} shows loaded from TVMaze
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => startSession(1)}
              className="w-64 bg-white text-purple-900 py-4 px-8 rounded-full text-xl font-bold hover:bg-pink-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              User 1 Start
            </button>
            <p className="text-pink-200 text-sm">
              First person swipes through all shows
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showMatches) {
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
                  className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all"
                >
                  <div className="text-6xl text-center mb-4">{movie.image}</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {movie.year} • {movie.genre}
                  </p>
                  <p className="text-sm text-gray-700">{movie.description}</p>
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
              onClick={restartApp}
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

  if (showUser2Transition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Film className="w-24 h-24 mx-auto text-white animate-pulse" />
            <h1 className="text-5xl font-bold text-white">User 1 Done! ✅</h1>
            <p className="text-xl text-pink-200">User 2, it's your turn!</p>
            <p className="text-lg text-pink-300">
              User 1 liked {user1Likes.length} show
              {user1Likes.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentUser(2);
              setShowUser2Transition(false);
            }}
            className="w-64 bg-white text-purple-900 py-4 px-8 rounded-full text-xl font-bold hover:bg-pink-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            User 2 Start Swiping
          </button>
        </div>
      </div>
    );
  }

  const currentMovie = currentMovies[0];

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
                <div className="text-8xl text-center mb-6">
                  {currentMovie.image}
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
              onClick={() => handleSwipe(false)}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95"
              disabled={swipeDirection !== null}
            >
              <X className="w-10 h-10 text-red-500" strokeWidth={3} />
            </button>
            <button
              onClick={() => handleSwipe(true)}
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

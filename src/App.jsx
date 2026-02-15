import { useState, useEffect } from "react";
import { fetchNetflixMovies } from "./utils/api";
import LoadingScreen from "./components/LoadingScreen";
import SessionSetupForm from "./components/SessionSetupForm";
import UserSelectionScreen from "./components/UserSelectionScreen";
import SwipeCard from "./components/SwipeCard";
import MatchResults from "./components/MatchResults";
import User2Transition from "./components/User2Transition";
import { genresMap } from "./utils/api";

export default function MovieMatcher() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [user1Likes, setUser1Likes] = useState([]);
  const [user2Likes, setUser2Likes] = useState([]);
  const [user1Swiped, setUser1Swiped] = useState([]);
  const [user2Swiped, setUser2Swiped] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showMatches, setShowMatches] = useState(false);
  const [showUser2Transition, setShowUser2Transition] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [fromYear, setFromYear] = useState(1980);
  const [tillYear, setTillYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState([
    Object.keys(genresMap)[0],
    Object.keys(genresMap)[3],
    Object.keys(genresMap)[4],
  ]);
  const [showCount, setShowCount] = useState(5);

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
          setShowMatches(true);
        }
      }
    }, 300);
  };

  const startSession = (userNumber) => {
    setCurrentUser(userNumber);
  };

  const loadMoviesWithFilters = async () => {
    setLoading(true);
    const filteredMovies = await fetchNetflixMovies(
      fromYear,
      tillYear,
      selectedGenres,
      showCount,
    );
    setMovies(filteredMovies);
    setLoading(false);
  };

  const restartApp = () => {
    setCurrentUser(null);
    setUser1Likes([]);
    setUser2Likes([]);
    setUser1Swiped([]);
    setUser2Swiped([]);
    setShowMatches(false);
    setSwipeDirection(null);
    setShowUser2Transition(false);
    setSessionStarted(false);
    setFromYear(1980);
    setTillYear(new Date().getFullYear());
    setSelectedGenres(
      Object.keys(genresMap)[0],
      Object.keys(genresMap)[3],
      Object.keys(genresMap)[4],
    );
    setShowCount(5);
  };

  const matches = movies.filter(
    (movie) => user1Likes.includes(movie.id) && user2Likes.includes(movie.id),
  );

  if (loading) {
    return <LoadingScreen />;
  } else if (!sessionStarted) {
    return (
      <SessionSetupForm
        fromYear={fromYear}
        setFromYear={setFromYear}
        tillYear={tillYear}
        setTillYear={setTillYear}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        showCount={showCount}
        setShowCount={setShowCount}
        onStartSession={async () => {
          await loadMoviesWithFilters();
          setSessionStarted(true);
        }}
        loading={loading}
      />
    );
  } else if (!currentUser) {
    return (
      <UserSelectionScreen
        movies={movies}
        selectedGenres={selectedGenres}
        fromYear={fromYear}
        tillYear={tillYear}
        onStartSession={startSession}
      />
    );
  } else if (showMatches) {
    return <MatchResults matches={matches} onRestart={restartApp} />;
  } else if (showUser2Transition) {
    return (
      <User2Transition
        user1LikesCount={user1Likes.length}
        onContinue={() => {
          setCurrentUser(2);
          setShowUser2Transition(false);
        }}
      />
    );
  } else {
    const currentMovie = currentMovies[0];

    return (
      <SwipeCard
        currentMovie={currentMovie}
        swipeDirection={swipeDirection}
        onSwipe={handleSwipe}
        currentMovies={currentMovies}
        movies={movies}
        currentUser={currentUser}
      />
    );
  }
}

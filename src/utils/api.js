

export const genresMap = {
    Action: "💥",
    Adventure: "🗻",
    Anime: "🎨",
    Comedy: "😂",
    Crime: "🔫",
    Drama: "🎭",
    Family: "👨‍👩‍👧‍👦",
    Horror: "👻",
    Music: "🎵",
    Romance: "💘",
    Thriller: "🎯",
    Documentary: "📹",
};
function yearsQuery(fromYear, tillYear) {
    let year = fromYear;
    let result = "&q=" + year;
    while (year <= tillYear) {
        year++;
        result += `&q=${year}`;
    }
    return result;
}
export async function fetchNetflixMovies(
    fromYear = 1980,
    tillYear = new Date().getFullYear(),
    selectedGenres = [],
    showCount = 5
) {
    try {
        console.log(`📺 Fetching movies: year ${fromYear}-${tillYear}, selectedGenres=${selectedGenres.join(",")}, showCount=${showCount}`);
        let allShows = [];
        const offset = 150;
        let maxPage = offset + 50;
        let page = offset;
        let queryForYears = yearsQuery(fromYear, tillYear)

        while (allShows.length < showCount && page < maxPage) {
            let query = `https://api.tvmaze.com/shows?page=${page}${queryForYears}`;
            console.log(`Calling ${query}`);

            const response = await fetch(query);

            if (!response.ok) {
                throw new Error("Failed to fetch from TVMaze");
            }

            const shows = await response.json();
            if (shows.length === 0) break; // No more pages

            const filteredShows = shows
                .map((show) => {
                    const genres = show.genres.length > 0 ? show.genres[0] : "Drama";
                    const emoji = genresMap[genres] || "📺";
                    const year = show.premiered ? new Date(show.premiered).getFullYear() : "N/A";

                    return {
                        id: show.id,
                        title: show.name,
                        year: year,
                        genre: genres,
                        imageUrl: show.image?.original || null,
                        image: emoji,
                        description: show.summary
                            ? show.summary.replace(/<[^>]*>/g, "").substring(0, 200)
                            : "An interesting show worth watching",
                        imdbId: show.externals?.imdb || null,
                    };
                })
                .filter((movie) => {
                    const year = Number(movie.year);
                    return !isNaN(year)
                        && year >= fromYear && year <= tillYear
                        && (selectedGenres.length === 0 || selectedGenres.includes(movie.genre));
                });
            allShows = allShows.concat(filteredShows);
            page++;
        }
        console.log(`✅ Filtered result: ${allShows.length} movies (from ${page - offset} pages fetched)`);
        return allShows.slice(0, showCount);
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
